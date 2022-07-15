import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
        "sidebar main"
        "playing playing";
    min-height: 100vh;
`;

const LayoutSidebar = styled.div`
    grid-area: sidebar;
    width: 320px;
    height: 100%;
    background-color: ${p => p.theme.black};
`;

const LayoutMain = styled.div`
    grid-area: main;
`;

const LayoutPlaying = styled.div`
    grid-area: playing;
    background-color: ${p => p.theme.gray50};
    border-top: 0.1rem solid ${p => p.theme.gray200};
    min-height: 7rem;
`;

export const PrimaryLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <LayoutGrid>
            <LayoutSidebar />
            <LayoutMain>{children}</LayoutMain>
            <LayoutPlaying />
        </LayoutGrid>
    );
};
