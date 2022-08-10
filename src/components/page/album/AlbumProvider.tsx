import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { AlbumProps } from "./Album";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { useSession } from "@lib/context/session";
import { useSavedAlbumsContainsQuery } from "@lib/api/album/query/useSavedAlbumsContainsQuery";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";
import { useArtistsAlbumsQuery } from "@lib/api/artist/query/useArtistsAlbumsQuery";
import { request } from "@lib/api";
import { resetContext, setContext } from "@lib/redux/reducer/context";
import { useAppDispatch } from "@lib/redux";

type AlbumDiscs = Record<string, SpotifyApi.TrackObjectSimplified[]>;

interface AlbumContextData {
    isFollowing: boolean;
    total: number;
    discs: AlbumDiscs;
    artist: SpotifyApi.ArtistObjectSimplified;
    otherAlbums: SpotifyApi.AlbumObjectSimplified[] | null;
    savedTracks: boolean[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handlePlay: (index?: number) => void;
    handleSaveTrack: (id: string, index: number) => void;
    handleRemoveTrack: (id: string, index: number) => void;
    handleSaveAlbum: () => void;
    handleRemoveAlbum: () => void;
}

const AlbumContext = createContext<AlbumContextData>({} as AlbumContextData);

const ALBUM_TRACKS_OFFSET = 50;

export const AlbumProvider: React.FC<PropsWithChildren<AlbumProps>> = ({ album, children }) => {
    const dispatch = useAppDispatch();
    const { access_token } = useSession();
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();

    const artist = album.artists[0];

    const {
        data: savedAlbumsContains,
        handleSaveAlbum,
        handleRemoveAlbum,
    } = useSavedAlbumsContainsQuery([album.id]);

    const { data: otherAlbumsData } = useArtistsAlbumsQuery(artist.id, undefined, 8);

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        handleSaveTrack,
        handleRemoveTrack,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.AlbumTracksResponse>({
        key: album.id,
        initialTracks: album.tracks,
        limit: ALBUM_TRACKS_OFFSET,
        enabled: !!access_token,
        queryFn: ({ pageParam = 1 }) =>
            request<SpotifyApi.AlbumTracksResponse>(access_token!, {
                url: `/albums/${album.id}/tracks`,
                params: { offset: pageParam * ALBUM_TRACKS_OFFSET, limit: ALBUM_TRACKS_OFFSET },
            }),
        idsFn: page => page.items.flatMap(item => item.id),
        getNextPageParam: (data, allPages) => {
            const lastPage = allPages[allPages.length - 1];

            return lastPage && album.tracks.total > lastPage.offset + lastPage.limit
                ? allPages.length
                : null;
        },
    });

    useEffect(() => {
        dispatch(setContext({ context_uri: album.uri, name: album.name }));

        return () => {
            dispatch(resetContext());
        };
    }, [album]);

    const mapTracksByDiscNumber = (tracks: SpotifyApi.TrackObjectSimplified[]): AlbumDiscs => {
        return tracks.reduce((acc, track) => {
            if (!acc[track.disc_number]) {
                acc[track.disc_number] = [];
            }

            acc[track.disc_number].push(track);

            return acc;
        }, {} as AlbumDiscs);
    };

    const discs = useMemo<AlbumDiscs>(() => {
        if (!tracksPages) {
            return mapTracksByDiscNumber(album.tracks.items);
        }

        return mapTracksByDiscNumber(tracksPages.pages.flatMap(page => (page ? page.items : [])));
    }, [tracksPages, album]);

    const otherAlbums = useMemo(() => {
        if (!otherAlbumsData) {
            return null;
        }

        const albums = [...otherAlbumsData.items];
        const index = albums.findIndex(item => item.id === album.id);

        if (index > -1) {
            albums.splice(index, 1);
        }

        return albums;
    }, [album, otherAlbumsData]);

    const handlePlay = useCallback(
        (index: number = 0) => {
            mutatePlay({
                offset: { position: index },
                context_uri: album.uri,
            });
        },
        [album]
    );

    return (
        <AlbumContext.Provider
            value={{
                isFollowing: !!savedAlbumsContains && savedAlbumsContains[0],
                total: album.total_tracks,
                discs,
                artist,
                otherAlbums,
                savedTracks,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handlePlay,
                handleSaveTrack,
                handleRemoveTrack,
                handleSaveAlbum: () => handleSaveAlbum(album.id, 0),
                handleRemoveAlbum: () => handleRemoveAlbum(album.id, 0),
            }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbum = () => useContext(AlbumContext);
