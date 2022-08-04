import { useEffect, useRef, useState } from "react";
import { useSession } from "@lib/context/session";
import { useAppDispatch } from "@lib/redux";
import player, {
    setCurrentTrack,
    setDuration,
    setPaused,
    setProgress,
    setRepeatMode,
    setShuffle,
} from "@lib/redux/reducer/player";
import { log } from "util";

interface SpotifyPlaybackData {
    deviceId: string | null;
}

type SpotifyPlayback = [Spotify.Player | null, SpotifyPlaybackData];

export const useSpotifyPlayback = (): SpotifyPlayback => {
    const dispatch = useAppDispatch();
    const { access_token } = useSession();
    const playerRef = useRef<Spotify.Player | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    useEffect(() => {
        if (!access_token || playerRef.current) {
            return;
        }

        if (window.Spotify) {
            initializePlayer();
        } else {
            window.onSpotifyWebPlaybackSDKReady = () => {
                initializePlayer();
            };
        }
    }, [access_token]);

    const initializePlayer = () => {
        if (!access_token) {
            return;
        }

        playerRef.current = new window.Spotify.Player({
            name: "Spotify Web Demo",
            getOAuthToken: cb => {
                cb(access_token);
            },
        });

        playerRef.current.addListener("ready", handleReady);
        playerRef.current.addListener("account_error", handleAuthenticationError);
        playerRef.current.addListener("initialization_error", handleAuthenticationError);
        playerRef.current.addListener("authentication_error", handleAuthenticationError);
        playerRef.current.addListener("player_state_changed", handlePlayerStateChanged);

        playerRef.current.connect();
    };

    const handleReady = ({ device_id }: Spotify.WebPlaybackInstance) => {
        setDeviceId(device_id);

        if (process.env.NODE_ENV !== "production") {
            console.log("Spotify Playback connected with device id: ", device_id);
        }
    };

    const handleAuthenticationError = (e: Spotify.Error) => {
        console.log(e);
    };

    const handlePlayerStateChanged = (playbackState: Spotify.PlaybackState) => {
        if (!playerRef.current) {
            return;
        }

        handlePlaybackState(playbackState);
        playerRef.current.getCurrentState().then(handlePlaybackState);
    };

    const handlePlaybackState = (playbackState: Spotify.PlaybackState | null) => {
        if (!playbackState) {
            return;
        }

        dispatch(setDuration(playbackState.duration));
        dispatch(setPaused(playbackState.paused));
        dispatch(setRepeatMode(playbackState.repeat_mode));
        dispatch(setShuffle(playbackState.shuffle));
        dispatch(setProgress(playbackState.position));
        dispatch(setCurrentTrack(playbackState.track_window.current_track));
    };

    return [playerRef.current, { deviceId }];
};
