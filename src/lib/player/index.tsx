import React, { createContext, useContext } from "react";

interface PlayerContextData {
    player: Spotify.Player | null;
    device_id: string | null;
    targetDeviceId: string | null;
    activeDevice: SpotifyApi.UserDevice | null;
    togglePlay: () => Promise<void>;
    nextTrack: () => Promise<void>;
    previousTrack: () => Promise<void>;
    mute: () => Promise<void>;
    unmute: (previousVolume?: number) => Promise<void>;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
