import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { getPlaylistTracks, PLAYLIST_TRACKS_OFFSET } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useRootPlaylistsQuery } from "@lib/api/playlist/hook/useRootPlaylistsQuery";
import { useRouter } from "next/router";
import { usePlaylistQuery } from "@lib/api/playlist/hook/usePlaylistQuery";
import { getIdFromQuery } from "@lib/util";

interface PlaylistContextData {
    playlist: SpotifyApi.PlaylistObjectFull | undefined;
    isFollowing: boolean;
    total: number | null;
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

export const PlaylistProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { query } = useRouter();
    const { access_token } = useSession();
    const {
        isFollowing,
        handleFollowPlaylist: handleFollowPlaylistQuery,
        handleUnfollowPlaylist: handleUnfollowPlaylistQuery,
    } = useRootPlaylistsQuery();

    const { data: playlist } = usePlaylistQuery(getIdFromQuery(query));

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        handleSaveTrack,
        handleRemoveTrack,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.PlaylistTrackResponse>({
        key: playlist ? playlist.id : null,
        initialTracks: playlist ? playlist.tracks : null,
        limit: PLAYLIST_TRACKS_OFFSET,
        enabled: !!access_token && !!playlist && false,
        queryFn: ({ pageParam = 1 }) => getPlaylistTracks(access_token!, playlist!.id, pageParam),
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

    const handleFollowPlaylist = () => {
        if (!playlist) {
            return;
        }

        handleFollowPlaylistQuery(playlist);
    };

    const handleUnfollowPlaylist = () => {
        if (!playlist) {
            return;
        }

        handleUnfollowPlaylistQuery(playlist.id);
    };

    return (
        <PlaylistContext.Provider
            value={{
                playlist,
                isFollowing: playlist ? isFollowing(playlist.id) : false,
                total: playlist ? playlist.tracks.total : null,
                tracks,
                savedTracks,
                handleSaveTrack,
                handleRemoveTrack,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handleFollowPlaylist,
                handleUnfollowPlaylist,
            }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const withPlaylist = <T,>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T) => {
        return (
            <PlaylistProvider>
                <WrappedComponent {...props} />
            </PlaylistProvider>
        );
    };

    ComponentWithProvider.displayName = `withPlaylist(${displayName})`;

    return ComponentWithProvider;
};

export const usePlaylist = () => useContext(PlaylistContext);
