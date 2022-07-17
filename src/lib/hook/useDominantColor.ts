import { useEffect } from "react";
import { FastAverageColor } from "fast-average-color";
import { getImageFromImageObject } from "@lib/image";

export const useDominantColor = (images?: SpotifyApi.ImageObject[] | null) => {
    useEffect(() => {
        if (!images) {
            document.body.style.removeProperty("--dominant-color");
            return;
        }

        const img = new Image();
        const src = getImageFromImageObject(images, images.length - 1);

        if (!src) {
            return;
        }

        img.src = src;
        img.setAttribute("crossorigin", "");

        const fac = new FastAverageColor();

        const onLoad = () => {
            const color = fac.getColor(img);

            if (color.hex === "#00000") {
                return;
            }

            document.body.style.setProperty("--dominant-color", color.hex);
        };

        img.addEventListener("load", onLoad);

        return () => {
            fac.destroy();
            img.removeEventListener("load", onLoad);
        };
    }, [images]);
};
