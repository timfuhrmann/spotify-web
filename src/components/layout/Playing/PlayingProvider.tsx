import React, { PropsWithChildren, useEffect } from "react";
import { usePlaybackStateQuery } from "@lib/api/player/usePlaybackStateQuery";
import { RootState, useAppDispatch } from "@lib/redux";
import {
    increaseProgress,
    setCurrentTrack,
    setDuration,
    setPaused,
    setProgress,
    setShuffle,
} from "@lib/redux/reducer/player";
import { useSelector } from "react-redux";

export const PlayingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { paused, currentTrack } = useSelector((state: RootState) => state.player);
    const { data: playbackState } = usePlaybackStateQuery();

    useEffect(() => {
        if (!playbackState || !playbackState.item || playbackState.item.type !== "track") {
            return;
        }

        dispatch(setDuration(playbackState.item.duration_ms));
        dispatch(setCurrentTrack(playbackState.item));
        dispatch(setShuffle(playbackState.shuffle_state));
        dispatch(setPaused(!playbackState.is_playing));
        dispatch(setProgress(playbackState.progress_ms));
    }, [playbackState]);

    useEffect(() => {
        if (paused || !currentTrack) {
            return;
        }

        const interval = setInterval(() => {
            dispatch(increaseProgress());
        }, 1000);

        return () => clearInterval(interval);
    }, [paused, currentTrack]);

    return <React.Fragment>{children}</React.Fragment>;
};
