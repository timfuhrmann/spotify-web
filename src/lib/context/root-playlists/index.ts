import { createContext, useContext } from "react";

interface RootPlaylistsContextData {
    playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
    handleFollowPlaylist: (playlist: SpotifyApi.PlaylistObjectSimplified) => Promise<void>;
    handleUnfollowPlaylist: (id: string) => Promise<void>;
}

export const RootPlaylistsContext = createContext<RootPlaylistsContextData>(
    {} as RootPlaylistsContextData
);

export const useRootPlaylists = () => useContext(RootPlaylistsContext);
