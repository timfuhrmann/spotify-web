import React from "react";
import styled from "styled-components";
import { Link } from "@lib/link";
import { text } from "@css/helper/typography";
import { transition } from "@css/helper";
import { useRouter } from "next/router";

const NavigationWrapper = styled.nav`
    display: flex;
    pointer-events: auto;
`;

const NavigationItem = styled.a`
    padding: 1rem 2rem;
    ${text("textSm", "bold")};
    line-height: 1;
    border-radius: 0.4rem;
    ${transition("background-color", "0.1s")};

    &[aria-current="page"] {
        background-color: ${p => p.theme.gray100};
    }
`;

export const HeaderLibraryNavigation: React.FC = () => {
    const { asPath } = useRouter();

    return (
        <NavigationWrapper>
            <Link label="Playlists" href="/library/playlists">
                <NavigationItem aria-current={asPath.startsWith("/library/playlists") && "page"}>
                    Playlists
                </NavigationItem>
            </Link>
            <Link label="Artists" href="/library/artists">
                <NavigationItem aria-current={asPath.startsWith("/library/artists") && "page"}>
                    Artists
                </NavigationItem>
            </Link>
            <Link label="Albums" href="/library/albums">
                <NavigationItem aria-current={asPath.startsWith("/library/albums") && "page"}>
                    Albums
                </NavigationItem>
            </Link>
        </NavigationWrapper>
    );
};
