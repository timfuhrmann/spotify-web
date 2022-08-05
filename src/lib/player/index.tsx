import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import Script from "next/script";
import { useSpotifyPlayback } from "@lib/player/hook/useSpotifyPlayback";
import { useSession } from "@lib/context/session";
import { useStartResumePlaybackMutation } from "@lib/api/player/useStartResumePlaybackMutation";
import { useDevicesQuery } from "@lib/api/player/useDevicesQuery";
import { queryClient } from "@lib/api";

interface PlayerContextData {
    player: Spotify.Player | null;
    device_id: string | null;
    activeDevice: SpotifyApi.UserDevice | null;
    togglePlay: () => Promise<void>;
    nextTrack: () => Promise<void>;
    previousTrack: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { session } = useSession();
    const { data: devicesData } = useDevicesQuery();
    const [player, { deviceId: device_id }] = useSpotifyPlayback();

    const devices = devicesData ? devicesData.devices : null;

    const activeDevice = useMemo<SpotifyApi.UserDevice | null>(() => {
        if (!devices) {
            return null;
        }

        return devices.find(device => device.is_active) || null;
    }, [devices]);

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
                device_id,
                activeDevice,
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
