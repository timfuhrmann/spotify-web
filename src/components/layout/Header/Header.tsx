import React from "react";
import styled from "styled-components";
import { useNavigation } from "@lib/context/navigation";
import { ChevronRight } from "@icon/ChevronRight";
import { fillParent, transition } from "@css/helper";
import { HeaderUser } from "./HeaderUser";
import { HeaderLibraryNavigation } from "./HeaderLibraryNavigation";

const HeaderWrapper = styled.header`
    position: relative;
    height: 100%;

    &::after {
        content: "";
        ${fillParent};
        z-index: -1;
        background-color: var(--dominant-color, ${p => p.theme.gray50});
        opacity: var(--scroll, 0);
        ${transition("background-color", "1s")};
    }
`;

const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
    height: 100%;
    max-width: ${p => p.theme.contentWidth.intrinsic};
    margin: 0 auto;
`;

const HeaderGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 4.8rem;
`;

const HeaderControls = styled.div`
    display: flex;
    align-items: center;
    gap: 1.8rem;
    pointer-events: auto;
`;

const HeaderButton = styled.button`
    display: inline-flex;
    padding: 0.4rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 50%;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const HeaderForth = styled(ChevronRight)`
    width: 2.2rem;
`;

const HeaderBack = styled(HeaderForth)`
    transform: scale(-1);
`;

interface HeaderProps {
    hasLibraryNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ hasLibraryNavigation }) => {
    const { hasBack, hasForth, navigateBack, navigateForth } = useNavigation();

    return (
        <HeaderWrapper>
            <HeaderInner>
                <HeaderGroup>
                    <HeaderControls>
                        <HeaderButton type="button" onClick={navigateBack} disabled={!hasBack}>
                            <HeaderBack />
                        </HeaderButton>
                        <HeaderButton type="button" onClick={navigateForth} disabled={!hasForth}>
                            <HeaderForth />
                        </HeaderButton>
                    </HeaderControls>
                    {hasLibraryNavigation && <HeaderLibraryNavigation />}
                </HeaderGroup>
                <HeaderUser />
            </HeaderInner>
        </HeaderWrapper>
    );
};
