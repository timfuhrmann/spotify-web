import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Navigation } from "./Navigation/Navigation";
import { Header } from "./Header/Header";
import { useRouter } from "next/router";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { RootPlaylistsProvider } from "@lib/context/root-playlists/RootPlaylistsProvider";
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

const LayoutMain = styled(OverlayScrollbarsComponent)`
    grid-area: main;
    min-height: 0;
`;

const LayoutPlaying = styled.div`
    grid-area: playing;
    z-index: 1;
    background-color: ${p => p.theme.gray50};
    border-top: 0.1rem solid ${p => p.theme.gray200};
    min-height: 7rem;
`;

export const PrimaryLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { asPath } = useRouter();
    const onScroll = useScrollVariable();

    return (
        <RootPlaylistsProvider>
            <LayoutGrid>
                <LayoutNavigation>
                    <Navigation />
                </LayoutNavigation>
                <LayoutHeader>
                    <Header />
                </LayoutHeader>
                <LayoutMain
                    key={asPath}
                    className="custom-scrollbar main-scrollbar"
                    options={{ callbacks: { onScroll } }}>
                    {children}
                </LayoutMain>
                <LayoutPlaying />
            </LayoutGrid>
        </RootPlaylistsProvider>
    );
};
