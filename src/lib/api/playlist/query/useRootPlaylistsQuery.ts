import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";
import { useCallback } from "react";
import { useFollowPlaylistMutation } from "@lib/api/playlist/mutation/useFollowPlaylistMutation";
import { useUnfollowPlaylistMutation } from "@lib/api/playlist/mutation/useUnfollowPlaylistMutation";

export const useRootPlaylistsQuery = () => {
    const { access_token } = useSession();
    const { mutate: mutateFollow } = useFollowPlaylistMutation();
    const { mutate: mutateUnfollow } = useUnfollowPlaylistMutation();

    const queryData = useQuery(
        ["root-playlists", access_token],
        async () => {
            const { items } = await request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
                access_token!,
                {
                    url: "/me/playlists",
                    params: { limit: 50 },
                }
            );

            return items;
        },
        {
            enabled: !!access_token,
        }
    );

    const isFollowing = useCallback(
        (id: string) => {
            if (!queryData.data) {
                return false;
            }

            return !!queryData.data.find(playlist => playlist.id === id);
        },
        [queryData.data]
    );

    const handleFollowPlaylist = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        if (!access_token) {
            return;
        }

        addPlaylistToCache(playlist);
        mutateFollow({ id: playlist.id });
    };

    const handleUnfollowPlaylist = (id: string) => {
        if (!access_token) {
            return;
        }

        removePlaylistFromCache(id);
        mutateUnfollow({ id });
    };

    const addPlaylistToCache = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        return queryClient.setQueryData<SpotifyApi.PlaylistObjectSimplified[] | undefined>(
            ["root-playlists", access_token],
            cachedData => {
                if (!cachedData) {
                    return;
                }

                return [playlist, ...cachedData];
            }
        );
    };

    const removePlaylistFromCache = (id: string) => {
        return queryClient.setQueryData<SpotifyApi.PlaylistObjectSimplified[] | undefined>(
            ["root-playlists", access_token],
            cachedData => {
                if (!cachedData) {
                    return;
                }

                return cachedData.flatMap(playlist => (playlist.id === id ? [] : playlist));
            }
        );
    };

    return { ...queryData, isFollowing, handleFollowPlaylist, handleUnfollowPlaylist };
};
