import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useAppDispatch } from "@lib/redux";
import { usePlayer } from "@lib/player";
import { useSavedTracksContainsQuery } from "@lib/api/track/query/useSavedTracksContainsQuery";
import { increaseProgress } from "@lib/redux/reducer/player/progress";
import { usePlaybackShuffleMutation } from "@lib/api/player/mutation/usePlaybackShuffleMutation";
import { useShuffleSelector } from "@lib/redux/reducer/player/hook/useShuffleSelector";
import { useDurationSelector } from "@lib/redux/reducer/player/hook/useDurationSelector";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";
import { setMuted } from "@lib/redux/reducer/player/volume";
import { enqueueSnackbar } from "notistack";

interface PlayingContextData {
    isDisabled: boolean;
    isSaved: boolean;
    onLikeTrack: () => void;
    onUnlikeTrack: () => void;
    handleRepeat: () => void;
    handleShuffle: () => void;
    handleMute: () => void;
    handleUnmute: (previousVolume: number) => void;
}

const PlayingContext = createContext<PlayingContextData>({} as PlayingContextData);

export const PlayingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const shuffle = useShuffleSelector();
    const duration = useDurationSelector();
    const { mute, unmute } = usePlayer();
    const { currentTrack, paused } = useCurrentTrackSelector();
    const { mutate: mutateShuffle } = usePlaybackShuffleMutation();

    const {
        data: savedTracks,
        handleLikeTrack,
        handleUnlikeTrack,
    } = useSavedTracksContainsQuery(currentTrack && currentTrack.id ? [currentTrack.id] : []);

    useEffect(() => {
        if (paused || !currentTrack) {
            return;
        }

        const interval = setInterval(() => {
            dispatch(increaseProgress());
        }, 1000);

        return () => clearInterval(interval);
    }, [duration, paused, currentTrack]);

    const onLikeTrack = () => {
        if (!currentTrack || !currentTrack.id) {
            return;
        }

        handleLikeTrack(currentTrack.id, 0);
    };

    const onUnlikeTrack = () => {
        if (!currentTrack || !currentTrack.id) {
            return;
        }

        handleUnlikeTrack(currentTrack.id, 0);
    };

    const handleRepeat = () => {
        enqueueSnackbar("Nah, can't do");
    };

    const handleShuffle = () => {
        mutateShuffle({ state: !shuffle });
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
                isDisabled: !currentTrack,
                isSaved: savedTracks && savedTracks.length > 0 ? savedTracks[0] : false,
                onLikeTrack,
                onUnlikeTrack,
                handleShuffle,
                handleRepeat,
                handleMute,
                handleUnmute,
            }}>
            {children}
        </PlayingContext.Provider>
    );
};

export const usePlaying = () => useContext(PlayingContext);
