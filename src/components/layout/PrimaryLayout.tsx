import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Navigation } from "./Navigation/Navigation";
import { Header } from "./Header/Header";
import { useRouter } from "next/router";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useScrollVariable } from "@lib/hook/useScrollVariable";

const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
        "navigation main"
        "playing playing";
    height: 100%;
`;

const LayoutNavigation = styled.div`
    grid-area: navigation;
    height: 100%;
    min-height: 0;
`;

const LayoutHeader = styled.div`
    grid-area: main;
    z-index: 1;
    height: ${p => p.theme.sizes.headerHeight / 10}rem;
    min-height: 0;
    pointer-events: none;
`;

const LayoutMain = styled.div`
    grid-area: main;
    min-height: 0;
    overflow: hidden;
`;

const LayoutStage = styled(OverlayScrollbarsComponent)`
    height: 100%;
`;

const LayoutPlaying = styled.div`
    grid-area: playing;
    z-index: 4;
    background-color: ${p => p.theme.gray50};
    border-top: 0.1rem solid ${p => p.theme.gray200};
    height: 7rem;
`;

interface PrimaryLayoutProps {
    hasLibraryNavigation?: boolean;
}

export const PrimaryLayout: React.FC<PropsWithChildren<PrimaryLayoutProps>> = ({
    hasLibraryNavigation,
    children,
}) => {
    const { asPath } = useRouter();
    const onScroll = useScrollVariable();

    return (
        <LayoutGrid>
            <LayoutNavigation>
                <Navigation />
            </LayoutNavigation>
            <LayoutHeader>
                <Header hasLibraryNavigation={hasLibraryNavigation} />
            </LayoutHeader>
            <LayoutMain>
                <LayoutStage
                    key={asPath}
                    className="custom-scrollbar main-scrollbar"
                    style={{ height: "100%" }}
                    options={{ callbacks: { onScroll } }}>
                    {children}
                </LayoutStage>
            </LayoutMain>
            <LayoutPlaying />
        </LayoutGrid>
    );
};
