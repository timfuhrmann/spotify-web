import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { PlaylistProps } from "./Playlist";
import { getPlaylistTracks, PLAYLIST_TRACKS_OFFSET } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useRootPlaylistsQuery } from "@lib/api/playlist/hook/useRootPlaylistsQuery";

interface PlaylistContextData {
    isFollowing: boolean;
    total: number;
    tracks: SpotifyApi.PlaylistTrackObject[];
    savedTracks: boolean[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
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

    const {
        data: playlists,
        handleFollowPlaylist,
        handleUnfollowPlaylist,
    } = useRootPlaylistsQuery();

    const isFollowing = playlists ? !!playlists.find(({ id }) => id === playlist.id) : false;

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        addSavedTrackToCache,
        removeSavedTrackFromCache,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.PlaylistTrackResponse>({
        key: playlist.id,
        initialTracks: playlist.tracks,
        limit: PLAYLIST_TRACKS_OFFSET,
        enabled: !!access_token,
        queryFn: ({ pageParam = 1 }) => getPlaylistTracks(access_token!, playlist.id, pageParam),
        idsFn: page => page.items.flatMap(item => (item.track ? item.track.id : [])),
        getNextPageParam: (data, allPages) => {
            const lastPage = allPages[allPages.length - 1];

            return lastPage && playlist.tracks.total > lastPage.offset + lastPage.limit
                ? allPages.length
                : null;
        },
    });

    const tracks = useMemo<SpotifyApi.PlaylistTrackObject[]>(() => {
        if (!tracksPages) {
            return playlist.tracks.items;
        }

        return tracksPages.pages.flatMap(page => (page ? page.items : []));
    }, [playlist, tracksPages]);

    const handleSaveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            addSavedTrackToCache(index);
            return saveTracks(access_token, [id]);
        },
        [access_token]
    );

    const handleRemoveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            removeSavedTrackFromCache(index);
            return removeTracks(access_token, [id]);
        },
        [access_token]
    );

    return (
        <PlaylistContext.Provider
            value={{
                isFollowing,
                total: playlist.tracks.total,
                tracks,
                savedTracks,
                handleSaveTrack,
                handleRemoveTrack,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handleFollowPlaylist: () => handleFollowPlaylist(playlist),
                handleUnfollowPlaylist: () => handleUnfollowPlaylist(playlist.id),
            }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => useContext(PlaylistContext);
