import React from "react";
import styled from "styled-components";
import { ChevronRight } from "@icon/ChevronRight";
import { fillParent, square, transition } from "@css/helper";
import { HeaderUser } from "./HeaderUser";
import { HeaderLibraryNavigation } from "./HeaderLibraryNavigation";
import { useNavigation } from "@lib/hook/useNavigation";
import { HeaderSearch } from "./HeaderSearch";
import { useContextSelector } from "@lib/redux/reducer/context/hook/useContextSelector";
import { PlayButton } from "../../shared/PlayButton";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";
import { text } from "@css/helper/typography";

const HeaderWrapper = styled.header`
    position: relative;
    height: 100%;

    &::after {
        content: "";
        ${fillParent};
        z-index: -1;
        background-color: var(--dominant-color, ${p => p.theme.gray50});
        opacity: var(--scroll, 0);
        ${transition("background-color", "0.5s")};
    }
`;

const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    gap: 2.4rem;
    height: 100%;
    max-width: ${p => p.theme.contentWidth.intrinsic};
    margin: 0 auto;
`;

const HeaderGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 4.8rem;
    flex: 1 1 0;
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

const HeaderContext = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    opacity: var(--header-context, 0);
    ${transition("opacity", "0.2s")};
    ${text("displayXs", "bold")};
`;

const HeaderPlay = styled.div`
    ${square("4.2rem")};
`;

interface HeaderProps {
    hasSearch?: boolean;
    hasLibraryNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ hasSearch, hasLibraryNavigation }) => {
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();
    const { name, context_uri } = useContextSelector();
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
                        {context_uri && name && (
                            <HeaderContext>
                                <HeaderPlay>
                                    <PlayButton onClick={() => mutatePlay({ context_uri })} />
                                </HeaderPlay>
                                {name}
                            </HeaderContext>
                        )}
                    </HeaderControls>
                    {hasSearch && <HeaderSearch />}
                    {hasLibraryNavigation && <HeaderLibraryNavigation />}
                </HeaderGroup>
                <HeaderUser />
            </HeaderInner>
        </HeaderWrapper>
    );
};
