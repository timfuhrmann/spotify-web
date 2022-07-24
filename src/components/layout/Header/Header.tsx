import React from "react";
import styled from "styled-components";
import { useNavigation } from "@lib/context/navigation";
import { ChevronRight } from "@icon/ChevronRight";
import { fillParent } from "@css/helper";
import { HeaderUser } from "./HeaderUser";

const HeaderWrapper = styled.header`
    position: relative;
    height: 100%;

    &::after {
        content: "";
        ${fillParent};
        z-index: -1;
        background-color: var(--dominant-color, ${p => p.theme.gray50});
        opacity: var(--scroll, 0);
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

export const Header: React.FC = () => {
    const { hasBack, hasForth, navigateBack, navigateForth } = useNavigation();

    return (
        <HeaderWrapper>
            <HeaderInner>
                <HeaderControls>
                    <HeaderButton type="button" onClick={navigateBack} disabled={!hasBack}>
                        <HeaderBack />
                    </HeaderButton>
                    <HeaderButton type="button" onClick={navigateForth} disabled={!hasForth}>
                        <HeaderForth />
                    </HeaderButton>
                </HeaderControls>
                <HeaderUser />
            </HeaderInner>
        </HeaderWrapper>
    );
};
