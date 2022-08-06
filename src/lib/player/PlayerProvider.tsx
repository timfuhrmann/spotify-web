import React, { PropsWithChildren, useMemo } from "react";
import Script from "next/script";
import { useSpotifyPlayback } from "@lib/player/hook/useSpotifyPlayback";
import { useSession } from "@lib/context/session";
import { useDevicesQuery } from "@lib/api/player/useDevicesQuery";
import { PlayerContext } from "@lib/player/index";
import { OverlayScrollProvider } from "@lib/context/overlay-scroll/OverlayScrollProvider";

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

    return (
        <PlayerContext.Provider
            value={{
                player,
                device_id,
                targetDeviceId,
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

export const withPlayer = <T,>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T) => {
        return (
            <OverlayScrollProvider>
                <WrappedComponent {...props} />
            </OverlayScrollProvider>
        );
    };

    ComponentWithProvider.displayName = `withOverlayScroll(${displayName})`;

    return ComponentWithProvider;
};
