import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";
import { Placement, PositioningStrategy } from "@popperjs/core";
import { useRouter } from "next/router";
import { useOverlayScroll } from "@lib/context/overlay-scroll";
import { PopoverItem } from "./PopoverItem";
import { PopoverSeparator } from "./PopoverSeparator";
import { PopoverList } from "./PopoverList";

const PopoverWrapper = styled.div`
    position: relative;
`;

//@todo handle zindex
const PopoverFrame = styled.div`
    z-index: 20;
    min-width: 20rem;
    background-color: ${p => p.theme.gray100};
    padding: 0.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 1.6rem 2.4rem rgba(0, 0, 0, 0.3);
`;

interface ParentComposition {
    Item: typeof PopoverItem;
    List: typeof PopoverList;
    Separator: typeof PopoverSeparator;
}

interface PopoverProps {
    placement?: Placement;
    strategy?: PositioningStrategy;
    isSecondary?: boolean;
    onClose: () => void;
}

export const Popover: React.FC<PropsWithChildren<PopoverProps>> & ParentComposition = ({
    onClose,
    strategy,
    placement = "bottom-start",
    isSecondary,
    children,
}) => {
    const { events } = useRouter();
    const { stopScroll, resumeScroll } = useOverlayScroll();
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        strategy,
        placement,
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
    });

    useEffect(() => {
        if (isSecondary) {
            return;
        }

        stopScroll();

        return () => {
            if (isSecondary) {
                return;
            }

            resumeScroll();
        };
    }, [isSecondary]);

    useEffect(() => {
        const onRouteChange = () => {
            onClose();
        };

        events.on("routeChangeComplete", onRouteChange);
        return () => events.off("routeChangeComplete", onRouteChange);
    }, [events]);

    return (
        <PopoverWrapper ref={setReferenceElement}>
            <PopoverFrame ref={setPopperElement} style={styles.popper} {...attributes}>
                {children}
            </PopoverFrame>
        </PopoverWrapper>
    );
};

Popover.Item = PopoverItem;
Popover.List = PopoverList;
Popover.Separator = PopoverSeparator;
