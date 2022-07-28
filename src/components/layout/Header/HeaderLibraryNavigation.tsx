import React from "react";
import styled from "styled-components";
import { Link } from "@lib/link";
import { text } from "@css/helper/typography";
import { useRouter } from "next/router";
import { transition } from "@css/helper";

const NavigationWrapper = styled.nav`
    display: flex;
    pointer-events: auto;
`;

const NavigationItem = styled.a<{ $active: boolean }>`
    padding: 1rem 2rem;
    ${text("textSm", "bold")};
    background-color: ${p => p.$active && p.theme.gray100};
    border-radius: 0.4rem;
    ${transition("background-color", "0.1s")};
`;

export const HeaderLibraryNavigation: React.FC = () => {
    const { asPath } = useRouter();

    return (
        <NavigationWrapper>
            <Link label="Playlists" href="/library/playlists">
                <NavigationItem $active={asPath.startsWith("/library/playlists")}>
                    Playlists
                </NavigationItem>
            </Link>
            <Link label="Artists" href="/library/artists">
                <NavigationItem $active={asPath.startsWith("/library/artists")}>
                    Artists
                </NavigationItem>
            </Link>
            <Link label="Albums" href="/library/albums">
                <NavigationItem $active={asPath.startsWith("/library/albums")}>
                    Albums
                </NavigationItem>
            </Link>
        </NavigationWrapper>
    );
};
