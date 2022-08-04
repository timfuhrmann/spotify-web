import React, { createContext, PropsWithChildren, useContext } from "react";
import Script from "next/script";
import { useSpotifyPlayback } from "@lib/player/hook/useSpotifyPlayback";
import { useSession } from "@lib/context/session";
import { useStartResumePlaybackMutation } from "@lib/api/player/useStartResumePlaybackMutation";

interface PlayerContextData {
    player: Spotify.Player | null;
    device_id: string | null;
    togglePlay: () => Promise<void>;
    nextTrack: () => Promise<void>;
    previousTrack: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { session } = useSession();
    const [player, { deviceId }] = useSpotifyPlayback();

    const togglePlay = async () => {
        if (!player) {
            return;
        }

        return player.togglePlay();
    };

    const nextTrack = async () => {
        if (!player) {
            return;
        }

        return player.nextTrack();
    };

    const previousTrack = async () => {
        if (!player) {
            return;
        }

        return player.previousTrack();
    };

    return (
        <PlayerContext.Provider
            value={{
                player,
                device_id: deviceId,
                togglePlay,
                previousTrack,
                nextTrack,
            }}>
            {session && (
                <Script
                    id="web-playback-sdk"
                    src="https://sdk.scdn.co/spotify-player.js"
                    strategy="afterInteractive"
                />
            )}
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
