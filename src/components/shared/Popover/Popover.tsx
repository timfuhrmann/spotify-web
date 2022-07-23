import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import { usePopper } from "react-popper";
import { Placement } from "@popperjs/core";

const PopoverWrapper = styled.div`
    position: relative;
`;

const PopoverFrame = styled.div`
    min-width: 20rem;
    background-color: ${p => p.theme.gray100};
    margin-top: 0.6rem;
    padding: 0.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 1.6rem 2.4rem rgba(0, 0, 0, 0.3);
`;

interface PopoverProps {
    placement?: Placement;
}

export const Popover: React.FC<PropsWithChildren<PopoverProps>> = ({
    placement = "bottom-start",
    children,
}) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
    });

    return (
        <PopoverWrapper ref={setReferenceElement}>
            <PopoverFrame ref={setPopperElement} style={styles.popper} {...attributes}>
                {children}
            </PopoverFrame>
        </PopoverWrapper>
    );
};
