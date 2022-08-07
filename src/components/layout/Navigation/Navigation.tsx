import React from "react";
import styled from "styled-components";
import { NavigationPlaylists } from "./NavigationPlaylists";
import { NavigationList } from "./NavigationList";
import { LogoText } from "@icon/LogoText";
import { Link } from "@lib/link";

const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30rem;
    padding-top: 2.4rem;
    background-color: ${p => p.theme.black};
`;

const NavigationSeparator = styled.div`
    border-bottom: 0.1rem solid ${p => p.theme.gray200};
    margin: 1rem 2.4rem 0;
`;

const NavigationHead = styled.div`
    margin-bottom: 2.4rem;
`;

const NavigationLogo = styled.a`
    padding: 0 2.4rem;
`;

export const Navigation: React.FC = () => {
    return (
        <NavigationWrapper>
            <NavigationHead>
                <Link href="/" label="Home">
                    <NavigationLogo>
                        <LogoText width="131" />
                    </NavigationLogo>
                </Link>
            </NavigationHead>
            <NavigationList />
            <NavigationSeparator />
            <NavigationPlaylists />
        </NavigationWrapper>
    );
};
