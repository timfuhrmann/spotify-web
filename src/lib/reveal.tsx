import React, { MutableRefObject, PropsWithChildren } from "react";
import { DEFAULT_EASE } from "@lib/animate";

export interface RevealProps {
    delay?: number;
    margin?: string;
    root?: MutableRefObject<HTMLElement | null>;
    opacity?: number;
}

export const Reveal: React.FC<PropsWithChildren<RevealProps>> = ({
    delay,
    root,
    margin,
    opacity = 1,
    children,
}) => {
    if (!children || !React.isValidElement(children)) {
        return null;
    }

    return React.cloneElement(children, {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, root, margin },
        variants: { hidden: { y: 150, opacity: 0 }, visible: { y: 0, opacity } },
        transition: { delay, duration: 1, ease: DEFAULT_EASE },
    });
};
