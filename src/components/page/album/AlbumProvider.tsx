import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { AlbumProps } from "./Album";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { ALBUM_TRACKS_OFFSET, getAlbumTracks, removeAlbum, saveAlbum } from "@lib/api/album";
import { useSession } from "@lib/context/session";
import { useSavedAlbumsContainsQuery } from "@lib/api/album/hook/useSavedAlbumsContainsQuery";
import { useStartResumePlaybackMutation } from "@lib/api/player/useStartResumePlaybackMutation";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { getIdFromQuery } from "@lib/util";

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

export const AlbumProvider: React.FC<PropsWithChildren<AlbumProps>> = ({ album, children }) => {
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
        queryFn: ({ pageParam = 1 }) => getAlbumTracks(access_token!, album.id, pageParam),
        idsFn: page => page.items.flatMap(item => item.id),
        getNextPageParam: (data, allPages) => {
            const lastPage = allPages[allPages.length - 1];

            return lastPage && album.tracks.total > lastPage.offset + lastPage.limit
                ? allPages.length
                : null;
        },
    });

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
