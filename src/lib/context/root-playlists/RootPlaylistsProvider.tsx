import React, { PropsWithChildren } from "react";
import cloneDeep from "lodash.clonedeep";
import { RootPlaylistsContext } from "@lib/context/root-playlists/index";
import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { followPlaylist, getRootPlaylists, unfollowPlaylist } from "@lib/api/playlist";
import { queryClient } from "@lib/api";

export const RootPlaylistsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { access_token } = useSession();

    const { data: playlists } = useQuery(["root-playlists", access_token], () =>
        getRootPlaylists(access_token)
    );

    const handleFollowPlaylist = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        addPlaylistToCache(playlist);
        return followPlaylist(access_token, playlist.id);
    };

    const handleUnfollowPlaylist = (id: string) => {
        removePlaylistFromCache(id);
        return unfollowPlaylist(access_token, id);
    };

    const addPlaylistToCache = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        return queryClient.setQueryData<SpotifyApi.PlaylistObjectSimplified[] | undefined>(
            ["root-playlists", access_token],
            data => {
                if (!data) {
                    return data;
                }

                const newData = cloneDeep(data);
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
            data => {
                if (!data) {
                    return data;
                }

                const newData = cloneDeep(data);
                const index = newData.findIndex(playlist => playlist.id === id);

                if (index > -1) {
                    newData.splice(index, 1);
                }

                return newData;
            }
        );
    };

    return (
        <RootPlaylistsContext.Provider
            value={{ playlists, handleFollowPlaylist, handleUnfollowPlaylist }}>
            {children}
        </RootPlaylistsContext.Provider>
    );
};
