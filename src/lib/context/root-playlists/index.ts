import { createContext, useContext } from "react";

interface RootPlaylistsContextData {
    playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
    refetch: () => Promise<unknown>;
}

export const RootPlaylistsContext = createContext<RootPlaylistsContextData>(
    {} as RootPlaylistsContextData
);

export const useRootPlaylists = () => useContext(RootPlaylistsContext);
