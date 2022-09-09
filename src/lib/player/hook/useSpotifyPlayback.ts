import { useEffect, useRef, useState } from "react";
import { useSession } from "@lib/context/session";
import { useAppDispatch } from "@lib/redux";
import {
    setCurrentTrack,
    setDuration,
    setPaused,
    setRepeatMode,
    setShuffle,
} from "@lib/redux/reducer/player";
import { queryClient } from "@lib/api";
import { setProgress } from "@lib/redux/reducer/player/progress";
import { repeatModeFromPlaybackSdk } from "@lib/util";

interface SpotifyPlaybackData {
    deviceId: string | null;
}

type SpotifyPlayback = [Spotify.Player | null, SpotifyPlaybackData];

export const useSpotifyPlayback = (): SpotifyPlayback => {
    const dispatch = useAppDispatch();
    const { access_token } = useSession();
    const playerRef = useRef<Spotify.Player | null>(null);
    const [webPlaybackSDKReady, setWebPlaybackSDKReady] = useState<boolean>(false);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            setWebPlaybackSDKReady(true);
        };
    }, []);

    useEffect(() => {
        if (!webPlaybackSDKReady || !access_token) {
            return;
        }

        const player = new window.Spotify.Player({
            name: "Spotify Web Demo",
            getOAuthToken: cb => {
                cb(access_token);
            },
        });

        playerRef.current = player;

        player.addListener("ready", handleReady);
        player.addListener("account_error", handleAuthenticationError);
        player.addListener("initialization_error", handleAuthenticationError);
        player.addListener("authentication_error", handleAuthenticationError);
        player.addListener("player_state_changed", handlePlayerStateChanged);

        player.connect();

        return () => player.disconnect();
    }, [webPlaybackSDKReady, access_token]);

    const handleReady = ({ device_id }: Spotify.WebPlaybackInstance) => {
        setDeviceId(device_id);
        queryClient.invalidateQueries(["devices"]);

        if (process.env.NODE_ENV !== "production") {
            console.log("Spotify Playback connected with device id: ", device_id);
        }
    };

    const handleAuthenticationError = (e: Spotify.Error) => {
        console.log(e);
        window.location.href = "/api/auth/login";
    };

    const handlePlayerStateChanged = (playbackState: Spotify.PlaybackState) => {
        if (!playerRef.current) {
            return;
        }

        handlePlaybackState(playbackState);
        playerRef.current.getCurrentState().then(handlePlaybackState);
    };

    const handlePlaybackState = (playbackState: Spotify.PlaybackState | null) => {
        if (!playbackState || !playbackState.track_window.current_track) {
            queryClient.invalidateQueries(["devices"]);
            return;
        }

        dispatch(setDuration(playbackState.duration));
        dispatch(setPaused(playbackState.paused));
        dispatch(setRepeatMode(repeatModeFromPlaybackSdk(playbackState.repeat_mode)));
        dispatch(setShuffle(playbackState.shuffle));
        dispatch(setProgress(playbackState.position));
        dispatch(setCurrentTrack(playbackState.track_window.current_track));
    };

    return [playerRef.current, { deviceId }];
};
