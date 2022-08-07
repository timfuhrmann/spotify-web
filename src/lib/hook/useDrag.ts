import { DependencyList, useEffect, useRef } from "react";

interface DragOptions {
    onDragStart: () => void;
    onDragStop: (abs: number | null) => void;
    onClick: (abs: number | null) => void;
    onProgressChanged: (abs: number | null) => void;
}

export const useDrag = (
    { onClick, onDragStart, onDragStop, onProgressChanged }: DragOptions,
    deps?: DependencyList
) => {
    const progressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = progressRef.current;

        if (!node) {
            return;
        }

        node.addEventListener("click", handleClick);
        node.addEventListener("mousedown", startDrag);
        document.addEventListener("mouseup", cancelDrag);
        document.addEventListener("mouseleave", cancelDrag);
        document.addEventListener("mousemove", handleProgress);

        return () => {
            node.removeEventListener("click", handleClick);
            node.removeEventListener("mousedown", startDrag);
            document.removeEventListener("mouseup", cancelDrag);
            document.removeEventListener("mouseleave", cancelDrag);
            document.removeEventListener("mousemove", handleProgress);
        };
    }, deps);

    const startDrag = () => {
        onDragStart();
    };

    const cancelDrag = (e: MouseEvent) => {
        onDragStop(positionFromMouseEvent(e));
    };

    const handleClick = (e: MouseEvent) => {
        onClick(positionFromMouseEvent(e));
    };

    const handleProgress = (e: MouseEvent) => {
        onProgressChanged(positionFromMouseEvent(e));
    };

    const positionFromMouseEvent = (e: MouseEvent): number | null => {
        if (!progressRef.current) {
            return null;
        }

        const { left, width } = progressRef.current.getBoundingClientRect();
        return Math.max(0, Math.min(1, (e.clientX - left) / width));
    };

    return progressRef;
};
