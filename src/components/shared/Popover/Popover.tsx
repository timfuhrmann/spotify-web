import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";
import { useRouter } from "next/router";
import { useOverlayScroll } from "@lib/context/overlay-scroll";

const PopoverWrapper = styled.div`
    position: relative;
`;

const PopoverFrame = styled.div`
    min-width: 20rem;
    background-color: ${p => p.theme.gray100};
    padding: 0.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 1.6rem 2.4rem rgba(0, 0, 0, 0.3);
`;

interface PopoverProps {
    placement?: Placement;
    onClose: () => void;
}

export const Popover: React.FC<PropsWithChildren<PopoverProps>> = ({
    onClose,
    placement = "bottom-start",
    children,
}) => {
    const { events } = useRouter();
    const { stopScroll, resumeScroll } = useOverlayScroll();
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
    });

    useEffect(() => {
        stopScroll();
        return () => resumeScroll();
    }, []);

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
