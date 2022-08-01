import cloneDeep from "lodash.clonedeep";
import { useQuery } from "react-query";
import { followPlaylist, getRootPlaylists, unfollowPlaylist } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";
import { useCallback, useMemo } from "react";

export const useRootPlaylistsQuery = () => {
    const { access_token } = useSession();

    const queryData = useQuery(
        ["root-playlists", access_token],
        () => getRootPlaylists(access_token!),
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
        return followPlaylist(access_token, playlist.id);
    };

    const handleUnfollowPlaylist = (id: string) => {
        if (!access_token) {
            return;
        }

        removePlaylistFromCache(id);
        return unfollowPlaylist(access_token, id);
    };

    const addPlaylistToCache = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        return queryClient.setQueryData<SpotifyApi.PlaylistObjectSimplified[] | undefined>(
            ["root-playlists", access_token],
            cachedData => {
                if (!cachedData) {
                    return;
                }

                const newData = cloneDeep(cachedData);
                const index = newData.findIndex(item => item.id === playlist.id);

                if (index === -1) {
                    newData.unshift(playlist);
                }

                return newData;
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

                const newData = cloneDeep(cachedData);
                const index = newData.findIndex(playlist => playlist.id === id);

                if (index > -1) {
                    newData.splice(index, 1);
                }

                return newData;
            }
        );
    };

    return { ...queryData, isFollowing, handleFollowPlaylist, handleUnfollowPlaylist };
};
