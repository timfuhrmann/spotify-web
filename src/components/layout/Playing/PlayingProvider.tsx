import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { usePlaybackStateQuery } from "@lib/api/player/usePlaybackStateQuery";
import { RootState, useAppDispatch } from "@lib/redux";
import {
    increaseProgress,
    setCurrentContext,
    setCurrentTrack,
    setDuration,
    setPaused,
    setProgress,
    setShuffle,
} from "@lib/redux/reducer/player";
import { useSelector } from "react-redux";

interface PlayingContextData {}

const PlayingContext = createContext<PlayingContextData>({} as PlayingContextData);

export const PlayingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { data: playbackState } = usePlaybackStateQuery();
    const { paused, currentTrack } = useSelector((state: RootState) => state.player);

    useEffect(() => {
        if (!playbackState || !playbackState.item || playbackState.item.type !== "track") {
            return;
        }

        dispatch(setDuration(playbackState.item.duration_ms));
        dispatch(setShuffle(playbackState.shuffle_state));
        dispatch(setPaused(!playbackState.is_playing));
        dispatch(setProgress(playbackState.progress_ms));
        dispatch(setCurrentTrack(playbackState.item));
        dispatch(setCurrentContext(playbackState.context ? playbackState.context.uri : null));
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

    return <PlayingContext.Provider value={{}}>{children}</PlayingContext.Provider>;
};

export const usePlaying = () => useContext(PlayingContext);
