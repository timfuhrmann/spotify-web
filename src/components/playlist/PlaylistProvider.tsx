import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { PlaylistProps } from "./Playlist";
import { followPlaylist, getPlaylistTracks, unfollowPlaylist } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { useRootPlaylists } from "@lib/context/root-playlists";
import { useInfiniteQuery } from "react-query";

interface PlaylistContextData {
    isFollowing: boolean;
    tracks: SpotifyApi.PlaylistTrackObject[];
    totalTracks: number;
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handleFollowPlaylist: () => Promise<void>;
    handleUnfollowPlaylist: () => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextData>({} as PlaylistContextData);

export const PlaylistProvider: React.FC<PropsWithChildren<PlaylistProps>> = ({
    playlist,
    children,
}) => {
    const { access_token } = useSession();
    const { playlists, refetch } = useRootPlaylists();

    const {
        data: infinitePages,
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery(
        ["playlist-tracks", playlist.id, access_token],
        ({ pageParam = 0 }) => getPlaylistTracks(access_token, playlist.id, pageParam),
        {
            getNextPageParam: (data, allPages) => {
                const lastPage = allPages[allPages.length - 1];
                return lastPage && lastPage.total > lastPage.offset + lastPage.limit
                    ? allPages.length
                    : null;
            },
        }
    );

    const isFollowing = useMemo(() => {
        if (!playlists) {
            return false;
        }

        return playlists.map(({ id }) => id).includes(playlist.id);
    }, [playlists, playlist]);

    const tracks = useMemo<SpotifyApi.PlaylistTrackObject[]>(() => {
        if (!infinitePages) {
            return playlist.tracks.items.slice(0, 50).filter(({ track }) => !!track);
        }

        return infinitePages.pages.flatMap(page => (page ? page.items : []));
    }, [playlist, infinitePages]);

    const handleFollowPlaylist = async () => {
        await followPlaylist(access_token, playlist.id);
        refetch();
    };

    const handleUnfollowPlaylist = async () => {
        await unfollowPlaylist(access_token, playlist.id);
        refetch();
    };

    return (
        <PlaylistContext.Provider
            value={{
                isFollowing,
                tracks,
                totalTracks: playlist.tracks.total,
                hasNextPage: hasNextPage || false,
                isLoading,
                fetchNextPage,
                handleFollowPlaylist,
                handleUnfollowPlaylist,
            }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => useContext(PlaylistContext);
