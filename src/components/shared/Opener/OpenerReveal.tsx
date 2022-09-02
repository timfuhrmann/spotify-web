import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Reveal, RevealProps } from "@lib/reveal";
import { useOpener } from "./OpenerProvider";
import { m } from "framer-motion";

const RevealWrapper = styled(m.div)`
    will-change: transform;
`;

export const OpenerReveal: React.FC<PropsWithChildren<Omit<RevealProps, "root">>> = ({
    delay,
    children,
}) => {
    const { wrapperRef } = useOpener();

    return (
        <Reveal delay={delay} root={wrapperRef}>
            <RevealWrapper>{children}</RevealWrapper>
        </Reveal>
    );
};
