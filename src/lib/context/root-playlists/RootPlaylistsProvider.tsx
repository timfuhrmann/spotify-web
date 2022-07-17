import React, { PropsWithChildren } from "react";
import { RootPlaylistsContext } from "@lib/context/root-playlists/index";
import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { getPlaylists } from "@lib/api/playlist";

export const RootPlaylistsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { access_token } = useSession();
    const { data, refetch } = useQuery(["playlists", access_token], () =>
        getPlaylists(access_token)
    );

    return (
        <RootPlaylistsContext.Provider value={{ playlists: data ? data.items : null, refetch }}>
            {children}
        </RootPlaylistsContext.Provider>
    );
};
