import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { m } from "framer-motion";
import { DEFAULT_EASE } from "@lib/animate";

export const HighlightFrame = styled(m.span)`
    background: linear-gradient(to right, ${p => p.theme.primary300}, ${p => p.theme.primary300});
    background-position: 0 calc(100% - 15%);
    background-repeat: no-repeat;
    will-change: background-size;
`;

interface HighlightProps {
    delay?: number;
}

export const Highlight: React.FC<PropsWithChildren<HighlightProps>> = ({ delay, children }) => {
    return (
        <HighlightFrame
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { backgroundSize: `0 30%` },
                visible: { backgroundSize: `100% 30%` },
            }}
            transition={{ delay, duration: 1, ease: DEFAULT_EASE }}>
            {children}
        </HighlightFrame>
    );
};
