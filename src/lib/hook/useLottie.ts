import { MutableRefObject, useEffect, useRef } from "react";
import lottie, { AnimationConfigWithPath, AnimationItem, AnimationSegment } from "lottie-web";

interface LottieData {
    currentFrame: number;
    play: (name?: string) => void;
    playSegments: (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) => void;
}

type LottieReturn = [MutableRefObject<HTMLDivElement | null>, LottieData];

export const useLottie = (
    options: Omit<AnimationConfigWithPath, "container" | "renderer">
): LottieReturn => {
    const frameRef = useRef<HTMLDivElement | null>(null);
    const lottieRef = useRef<AnimationItem | null>(null);

    const currentFrame = lottieRef.current ? lottieRef.current.currentFrame : 0;

    useEffect(() => {
        if (!frameRef.current) {
            return;
        }

        lottieRef.current = lottie.loadAnimation({
            container: frameRef.current,
            renderer: "svg",
            ...options,
        });

        return () => destroy();
    }, []);

    const play = (name?: string) => {
        if (!lottieRef.current) {
            return;
        }

        return lottieRef.current.play(name);
    };

    const playSegments = (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) => {
        if (!lottieRef.current) {
            return;
        }

        return lottieRef.current.playSegments(segments, forceFlag);
    };

    const destroy = () => {
        if (!lottieRef.current) {
            return;
        }

        lottieRef.current.destroy();
    };

    return [frameRef, { currentFrame, play, playSegments }];
};
