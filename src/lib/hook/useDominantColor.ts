import React, { useEffect, useRef } from "react";
import { FastAverageColor } from "fast-average-color";

export const useDominantColor = (preventAuto?: boolean) => {
    const dominantColorRef = useRef<string | null>(null);

    useEffect(() => {
        return () => removeDominantColor();
    }, []);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (!e.target) {
            return;
        }

        const img = e.target as HTMLImageElement;
        img.setAttribute("crossorigin", "");

        const fac = new FastAverageColor();
        const color = fac.getColor(img);

        if (color.hex === "#000000") {
            return;
        }

        dominantColorRef.current = color.hex;

        if (!preventAuto) {
            setDominantColor();
        }

        fac.destroy();
    };

    const setDominantColor = () => {
        document.body.style.setProperty("--dominant-color", dominantColorRef.current);
    };

    const removeDominantColor = () => {
        document.body.style.removeProperty("--dominant-color");
    };

    return {
        handleImageLoad,
        setDominantColor,
        removeDominantColor,
    };
};
