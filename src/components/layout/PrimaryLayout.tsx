import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Navigation } from "./Navigation/Navigation";
import { Header } from "./Header/Header";
import { useRouter } from "next/router";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { withOverlayScroll } from "@lib/context/overlay-scroll/OverlayScrollProvider";
import { useOverlayScroll } from "@lib/context/overlay-scroll";
import { pathnameFromAsPath } from "@lib/util";
import { Playing } from "./Playing/Playing";
import { zIndex } from "@css/helper/hierarchy";

const LayoutGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
        "navigation main"
        "playing playing";
    height: 100%;
    min-width: 100rem;
`;

const LayoutNavigation = styled.div`
    grid-area: navigation;
    height: 100%;
    min-height: 0;
`;

const LayoutHeader = styled.div`
    grid-area: main;
    z-index: ${zIndex.header};
    height: ${p => p.theme.sizes.headerHeight / 10}rem;
    min-height: 0;
    pointer-events: none;
`;

const LayoutMain = styled.div`
    grid-area: main;
    min-height: 0;
    overflow: hidden;
`;

const LayoutPlaying = styled.div`
    grid-area: playing;
    z-index: ${zIndex.playing};
`;

interface PrimaryLayoutProps {
    hasSearch?: boolean;
    hasLibraryNavigation?: boolean;
}

export const PrimaryLayout = withOverlayScroll<PropsWithChildren<PrimaryLayoutProps>>(
    ({ hasLibraryNavigation, hasSearch, children }) => {
        const { initOverlayScrollbars, onScroll } = useOverlayScroll();

        return (
            <LayoutGrid>
                <LayoutNavigation>
                    <Navigation />
                </LayoutNavigation>
                <LayoutHeader>
                    <Header hasSearch={hasSearch} hasLibraryNavigation={hasLibraryNavigation} />
                </LayoutHeader>
                <LayoutMain>
                    <OverlayScrollbarsComponent
                        ref={initOverlayScrollbars}
                        style={{ height: "100%" }}
                        className="custom-scrollbar main-scrollbar"
                        options={{ callbacks: { onScroll }, updateOnLoad: null }}>
                        {children}
                    </OverlayScrollbarsComponent>
                </LayoutMain>
                <LayoutPlaying>
                    <Playing />
                </LayoutPlaying>
            </LayoutGrid>
        );
    }
);
