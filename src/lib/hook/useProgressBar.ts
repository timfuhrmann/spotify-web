import { useEffect, useRef } from "react";
import { usePlayer } from "@lib/player";
import { useAppDispatch } from "@lib/redux";
import { setDragging, setDraggingProgress } from "@lib/redux/reducer/player/progress";
import { useDraggingSelector } from "@lib/redux/reducer/player/hook/useDraggingSelector";
import { useDurationSelector } from "@lib/redux/reducer/player/hook/useDurationSelector";

export const useProgressBar = () => {
    const dispatch = useAppDispatch();
    const progressRef = useRef<HTMLDivElement | null>(null);
    const { player } = usePlayer();
    const dragging = useDraggingSelector();
    const duration = useDurationSelector();

    useEffect(() => {
        const node = progressRef.current;

        if (!node) {
            return;
        }

        node.addEventListener("click", onClick);
        node.addEventListener("mousedown", startDrag);
        document.addEventListener("mouseup", cancelDrag);
        document.addEventListener("mouseleave", cancelDrag);
        document.addEventListener("mousemove", handleProgress);

        return () => {
            node.removeEventListener("click", onClick);
            node.removeEventListener("mousedown", startDrag);
            document.removeEventListener("mouseup", cancelDrag);
            document.removeEventListener("mouseleave", cancelDrag);
            document.removeEventListener("mousemove", handleProgress);
        };
    }, [player, duration, dragging]);

    const onClick = (e: MouseEvent) => {
        const progress = progressFromMouseEvent(e);
        dispatch(setDraggingProgress(progress));

        if (player && progress !== null) {
            player.seek(progress);
        }
    };

    const startDrag = () => {
        dispatch(setDragging(true));
    };

    const cancelDrag = (e: MouseEvent) => {
        if (dragging) {
            const progress = progressFromMouseEvent(e);
            dispatch(setDraggingProgress(progress));

            if (player && progress !== null) {
                player.seek(progress);
            }
        }

        dispatch(setDragging(false));
    };

    const handleProgress = (e: MouseEvent) => {
        if (!dragging) {
            return;
        }

        dispatch(setDraggingProgress(progressFromMouseEvent(e)));
    };

    const progressFromMouseEvent = (e: MouseEvent): number | null => {
        if (!progressRef.current) {
            return null;
        }

        const { left, width } = progressRef.current.getBoundingClientRect();
        return Math.max(0, Math.min(1, (e.clientX - left) / width)) * duration;
    };

    return progressRef;
};
