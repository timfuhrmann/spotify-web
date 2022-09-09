import React, { PropsWithChildren, useMemo } from "react";
import Script from "next/script";
import { useSpotifyPlayback } from "@lib/player/hook/useSpotifyPlayback";
import { useSession } from "@lib/context/session";
import { useDevicesQuery } from "@lib/api/player/query/useDevicesQuery";
import { PlayerContext } from "@lib/player/index";

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { session } = useSession();
    const { data: devicesData } = useDevicesQuery();
    const [player, { deviceId: device_id }] = useSpotifyPlayback();

    const devices = useMemo<SpotifyApi.UserDevice[] | null>(() => {
        if (!devicesData) {
            return null;
        }

        return devicesData.devices
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => (a.id && a.id === device_id ? -1 : 0));
    }, [devicesData, device_id]);

    const activeDevice = useMemo<SpotifyApi.UserDevice | null>(() => {
        if (!devices) {
            return null;
        }

        return devices.find(device => device.is_active) || null;
    }, [devices]);

    const targetDeviceId =
        activeDevice && activeDevice.id !== device_id ? activeDevice.id : device_id;

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

    const mute = async () => {
        if (!player) {
            return;
        }

        return player.setVolume(0);
    };

    const unmute = async (previousVolume: number = 1) => {
        if (!player) {
            return;
        }

        return player.setVolume(previousVolume);
    };

    return (
        <PlayerContext.Provider
            value={{
                player,
                device_id,
                targetDeviceId,
                devices,
                activeDevice,
                togglePlay,
                previousTrack,
                nextTrack,
                mute,
                unmute,
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
