import React from "react";
import styled from "styled-components";
import { content } from "@css/helper/content";
import { fillParent, transition } from "@css/helper";
import { SearchNavigationItem } from "./SearchNavigationItem";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

//@todo organize z-indexes
const NavigationWrapper = styled.nav`
    position: sticky;
    z-index: 4;
    top: ${p => p.theme.sizes.headerHeight / 10}rem;

    &::after {
        content: "";
        ${fillParent};
        z-index: -1;
        background-color: var(--dominant-color, ${p => p.theme.gray100});
        opacity: var(--scroll, 0);
        ${transition("background-color", "0.5s")};
    }
`;

const NavigationFrame = styled.div`
    display: flex;
    gap: 1.2rem;
    ${content()};
    padding: 1.2rem 0;
`;

export const SearchNavigation: React.FC = () => {
    const types = useSelector((state: RootState) => state.search.types);

    return (
        <NavigationWrapper>
            <NavigationFrame>
                <SearchNavigationItem label="All" />
                {types.map(type => (
                    <SearchNavigationItem key={type} label={type} type={type} />
                ))}
            </NavigationFrame>
        </NavigationWrapper>
    );
};
