import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { usePlaybackStateQuery } from "@lib/api/player/usePlaybackStateQuery";
import { useAppDispatch } from "@lib/redux";
import {
    RepeatMode,
    setCurrentContext,
    setCurrentTrack,
    setDuration,
    setPaused,
    setRepeatMode,
    setShuffle,
} from "@lib/redux/reducer/player";
import { usePlayer } from "@lib/player";
import { useSavedTracksContainsQuery } from "@lib/api/track/hook/useSavedTracksContainsQuery";
import { increaseProgress, setProgress } from "@lib/redux/reducer/player/progress";
import { useStartResumePlaybackMutation } from "@lib/api/player/useStartResumePlaybackMutation";
import { usePlaybackPauseMutation } from "@lib/api/player/usePlaybackPauseMutation";
import { usePlaybackRepeatModeMutation } from "@lib/api/player/usePlaybackRepeatModeMutation";
import { usePlaybackShuffleMutation } from "@lib/api/player/usePlaybackShuffleMutation";
import { useShuffleSelector } from "@lib/redux/reducer/player/hook/useShuffleSelector";
import { useRepeatModeSelector } from "@lib/redux/reducer/player/hook/useRepeatModeSelector";
import { useDurationSelector } from "@lib/redux/reducer/player/hook/useDurationSelector";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";
import { usePlaybackNext } from "@lib/api/player/usePlaybackNext";
import { usePlaybackPrevious } from "@lib/api/player/usePlaybackPrevious";
import volume, { setMuted, setVolume } from "@lib/redux/reducer/player/volume";

interface PlayingContextData {
    isDisabled: boolean;
    isSaved: boolean;
    onSaveTrack: () => void;
    onRemoveTrack: () => void;
    handlePlay: () => void;
    handleRepeat: () => void;
    handleShuffle: () => void;
    handlePreviousTrack: () => void;
    handleNextTrack: () => void;
    handleMute: () => void;
    handleUnmute: (previousVolume: number) => void;
}

const PlayingContext = createContext<PlayingContextData>({} as PlayingContextData);

export const PlayingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const shuffle = useShuffleSelector();
    const duration = useDurationSelector();
    const repeatMode = useRepeatModeSelector();
    const { currentTrack, paused } = useCurrentTrackSelector();
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();
    const { mutate: mutatePause } = usePlaybackPauseMutation();
    const { mutate: mutateRepeatMode } = usePlaybackRepeatModeMutation();
    const { mutate: mutateShuffle } = usePlaybackShuffleMutation();
    const { mutate: mutateNext } = usePlaybackNext();
    const { mutate: mutatePrevious } = usePlaybackPrevious();
    const { data: playbackState } = usePlaybackStateQuery();
    const { activeDevice, device_id, togglePlay, previousTrack, nextTrack, mute, unmute } =
        usePlayer();

    const {
        data: savedTracks,
        handleSaveTrack,
        handleRemoveTrack,
    } = useSavedTracksContainsQuery(currentTrack && currentTrack.id ? [currentTrack.id] : []);

    useEffect(() => {
        if (!playbackState || !playbackState.item || playbackState.item.type !== "track") {
            return;
        }

        dispatch(setDuration(playbackState.item.duration_ms));
        dispatch(setShuffle(playbackState.shuffle_state));
        dispatch(setRepeatMode(playbackState.repeat_state));
        dispatch(setPaused(!playbackState.is_playing));
        dispatch(setCurrentTrack(playbackState.item));
        dispatch(setCurrentContext(playbackState.context ? playbackState.context.uri : null));

        if (activeDevice && activeDevice.id !== device_id) {
            dispatch(setProgress(playbackState.progress_ms));
        }
    }, [playbackState, activeDevice, device_id]);

    useEffect(() => {
        if (!activeDevice || activeDevice.volume_percent === null) {
            return;
        }

        if (activeDevice.volume_percent === 0) {
            dispatch(setMuted(true));
        } else {
            dispatch(setVolume(activeDevice.volume_percent / 100));
            dispatch(setMuted(false));
        }
    }, [activeDevice]);

    useEffect(() => {
        if (paused || !currentTrack) {
            return;
        }

        const interval = setInterval(() => {
            dispatch(increaseProgress());
        }, 1000);

        return () => clearInterval(interval);
    }, [duration, paused, currentTrack]);

    const onSaveTrack = () => {
        if (!currentTrack || !currentTrack.id) {
            return;
        }

        handleSaveTrack(currentTrack.id, 0);
    };

    const onRemoveTrack = () => {
        if (!currentTrack || !currentTrack.id) {
            return;
        }

        handleRemoveTrack(currentTrack.id, 0);
    };

    const handlePlay = () => {
        if (activeDevice && activeDevice.id !== device_id) {
            if (paused) {
                mutatePlay({});
            } else {
                mutatePause();
            }
        } else {
            togglePlay();
        }
    };

    const handleRepeat = () => {
        let state: RepeatMode = "context";

        switch (repeatMode) {
            case "context":
                state = "track";
                break;
            case "track":
                state = "off";
                break;
        }

        mutateRepeatMode({ state });
    };

    const handleShuffle = () => {
        mutateShuffle({ state: !shuffle });
    };

    const handlePreviousTrack = () => {
        if (activeDevice && activeDevice.id !== device_id) {
            mutatePrevious();
        } else {
            previousTrack();
        }
    };

    const handleNextTrack = () => {
        if (activeDevice && activeDevice.id !== device_id) {
            mutateNext();
        } else {
            nextTrack();
        }
    };

    const handleMute = async () => {
        await mute();
        dispatch(setMuted(true));
    };

    const handleUnmute = async (previousVolume: number) => {
        await unmute(previousVolume);
        dispatch(setMuted(false));
    };

    return (
        <PlayingContext.Provider
            value={{
                isDisabled: !activeDevice && !currentTrack,
                isSaved: savedTracks && savedTracks.length > 0 ? savedTracks[0] : false,
                onSaveTrack,
                onRemoveTrack,
                handlePlay,
                handleShuffle,
                handleRepeat,
                handlePreviousTrack,
                handleNextTrack,
                handleMute,
                handleUnmute,
            }}>
            {children}
        </PlayingContext.Provider>
    );
};

export const usePlaying = () => useContext(PlayingContext);
