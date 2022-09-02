import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSession } from "@lib/context/session";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";
import { PlaylistProps } from "./Playlist";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";
import { request } from "@lib/api";
import { useAppDispatch } from "@lib/redux";
import { resetContext, setContext } from "@lib/redux/reducer/context";
import { useRemoveTracksFromPlaylistMutation } from "@lib/api/playlist/mutation/useRemoveTracksFromPlaylistMutation";
import { PlaylistDetails, PlaylistDetailsForm } from "../../shared/PlaylistDetails";
import { useChangePlaylistDetailsMutation } from "@lib/api/playlist/mutation/useChangePlaylistDetailsMutation";

interface PlaylistContextData {
    isOwner: boolean;
    isFollowing: boolean;
    total: number;
    tracks: SpotifyApi.PlaylistTrackObject[];
    savedTracks: boolean[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handlePlay: (index?: number) => void;
    handleRemove: (uri: string, index: number) => void;
    handleLikeTrack: (id: string, index: number) => void;
    handleUnlikeTrack: (id: string, index: number) => void;
    handleFollowPlaylist: () => void;
    handleUnfollowPlaylist: () => void;
    setPlaylistDetails: Dispatch<SetStateAction<boolean>>;
}

const PlaylistContext = createContext<PlaylistContextData>({} as PlaylistContextData);

const PLAYLIST_TRACKS_OFFSET = 100;

export const PlaylistProvider: React.FC<PropsWithChildren<PlaylistProps>> = ({
    playlist,
    children,
}) => {
    const dispatch = useAppDispatch();
    const { session } = useSession();
    const { access_token } = useSession();
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();
    const { mutate: mutateRemove } = useRemoveTracksFromPlaylistMutation();
    const { mutate: mutateDetails } = useChangePlaylistDetailsMutation(playlist.id);
    const [playlistDetails, setPlaylistDetails] = useState<boolean>(false);

    const isOwner = !!session && session.id === playlist.owner.id;

    const {
        isFollowing,
        handleFollowPlaylist: handleFollowPlaylistQuery,
        handleUnfollowPlaylist: handleUnfollowPlaylistQuery,
    } = useRootPlaylistsQuery();

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        handleLikeTrack,
        handleUnlikeTrack,
        writeToTracksCache,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.PlaylistTrackResponse>({
        key: playlist.id,
        initialTracks: playlist.tracks,
        limit: PLAYLIST_TRACKS_OFFSET,
        enabled: !!access_token,
        queryFn: ({ pageParam = 1 }) =>
            request<SpotifyApi.PlaylistTrackResponse>(access_token!, {
                url: `/playlists/${playlist.id}/tracks`,
                params: {
                    offset: pageParam * PLAYLIST_TRACKS_OFFSET,
                    limit: PLAYLIST_TRACKS_OFFSET,
                },
            }),
        idsFn: page => page.items.flatMap(item => (item.track ? item.track.id : [])),
        getNextPageParam: (data, allPages) => {
            const lastPage = allPages[allPages.length - 1];

            return lastPage && lastPage.total > lastPage.offset + lastPage.limit
                ? allPages.length
                : null;
        },
    });

    useEffect(() => {
        dispatch(setContext({ context_uri: playlist.uri, name: playlist.name }));

        return () => {
            dispatch(resetContext());
        };
    }, [playlist]);

    const tracks = useMemo<SpotifyApi.PlaylistTrackObject[]>(() => {
        if (!tracksPages) {
            return playlist ? playlist.tracks.items : [];
        }

        return tracksPages.pages.flatMap(page => (page ? page.items : []));
    }, [playlist, tracksPages]);

    const handlePlay = useCallback(
        (index: number = 0) => {
            mutatePlay({
                offset: { position: index },
                context_uri: playlist.uri,
            });
        },
        [playlist]
    );

    const handleRemove = useCallback(
        (uri: string, index: number) => {
            if (!access_token) {
                return;
            }

            removeTrackFromCache(index);
            mutateRemove({ uris: [uri], playlistId: playlist.id });
        },
        [playlist, access_token]
    );

    const removeTrackFromCache = (index: number) => {
        writeToTracksCache(cachedData => {
            if (!cachedData) {
                return cachedData;
            }

            const pageIndex = Math.floor(index / playlist.tracks.limit);
            const trackIndex = index - pageIndex * playlist.tracks.limit;

            return {
                ...cachedData,
                pages: cachedData.pages.map((page, index) => {
                    if (!page || index !== pageIndex) {
                        return page;
                    }

                    return {
                        ...page,
                        items: page.items.flatMap((item, index) =>
                            index === trackIndex ? [] : item
                        ),
                    };
                }),
            };
        });
    };

    const handleChangeDetails = ({ name, description }: PlaylistDetailsForm) => {
        setPlaylistDetails(false);
        mutateDetails({
            name,
            description: description ? description : undefined,
        });
    };

    return (
        <PlaylistContext.Provider
            value={{
                isOwner,
                isFollowing: isFollowing(playlist.id),
                total: playlist.tracks.total,
                tracks,
                savedTracks,
                handleLikeTrack,
                handleUnlikeTrack,
                handleRemove,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handlePlay,
                handleFollowPlaylist: () => handleFollowPlaylistQuery(playlist),
                handleUnfollowPlaylist: () => handleUnfollowPlaylistQuery(playlist.id),
                setPlaylistDetails,
            }}>
            {isOwner && playlistDetails && (
                <PlaylistDetails
                    name={playlist.name}
                    description={playlist.description}
                    onSubmit={handleChangeDetails}
                    onClose={() => setPlaylistDetails(false)}
                />
            )}
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => useContext(PlaylistContext);
