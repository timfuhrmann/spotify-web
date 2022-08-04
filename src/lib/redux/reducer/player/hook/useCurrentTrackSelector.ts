import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { useCallback } from "react";

export const useCurrentTrackSelector = () => {
    const paused = useSelector((state: RootState) => state.player.paused);
    const currentTrack = useSelector((state: RootState) => state.player.currentTrack);

    const isTrackPlaying = useCallback(
        (uri: string) => {
            return !paused && currentTrack ? currentTrack.uri === uri : false;
        },
        [paused, currentTrack]
    );

    return { paused, currentTrack, isTrackPlaying };
};
