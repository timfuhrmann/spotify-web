import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { getPlaylistTracks, PLAYLIST_TRACKS_OFFSET } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { useRootPlaylistsQuery } from "@lib/api/playlist/hook/useRootPlaylistsQuery";
import { PlaylistProps } from "./Playlist";
import { useStartResumePlaybackMutation } from "@lib/api/player/useStartResumePlaybackMutation";

interface PlaylistContextData {
    isFollowing: boolean;
    total: number;
    tracks: SpotifyApi.PlaylistTrackObject[];
    savedTracks: boolean[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handlePlay: (index?: number) => void;
    handleSaveTrack: (id: string, index: number) => void;
    handleRemoveTrack: (id: string, index: number) => void;
    handleFollowPlaylist: () => void;
    handleUnfollowPlaylist: () => void;
}

const PlaylistContext = createContext<PlaylistContextData>({} as PlaylistContextData);

export const PlaylistProvider: React.FC<PropsWithChildren<PlaylistProps>> = ({
    playlist,
    children,
}) => {
    const { access_token } = useSession();
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();

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
        handleSaveTrack,
        handleRemoveTrack,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.PlaylistTrackResponse>({
        key: playlist.id,
        initialTracks: playlist.tracks,
        limit: PLAYLIST_TRACKS_OFFSET,
        enabled: !!access_token,
        queryFn: ({ pageParam = 1 }) => getPlaylistTracks(access_token!, playlist.id, pageParam),
        idsFn: page => page.items.flatMap(item => (item.track ? item.track.id : [])),
        getNextPageParam: (data, allPages) => {
            const lastPage = allPages[allPages.length - 1];

            return lastPage && lastPage.total > lastPage.offset + lastPage.limit
                ? allPages.length
                : null;
        },
    });

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

    return (
        <PlaylistContext.Provider
            value={{
                isFollowing: isFollowing(playlist.id),
                total: playlist.tracks.total,
                tracks,
                savedTracks,
                handleSaveTrack,
                handleRemoveTrack,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handlePlay,
                handleFollowPlaylist: () => handleFollowPlaylistQuery(playlist),
                handleUnfollowPlaylist: () => handleUnfollowPlaylistQuery(playlist.id),
            }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => useContext(PlaylistContext);
