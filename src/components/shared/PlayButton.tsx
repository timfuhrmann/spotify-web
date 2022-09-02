import React from "react";
import styled from "styled-components";
import { hover, square } from "@css/helper";
import { Play } from "@icon/Play";
import { Pause } from "@icon/Pause";

const ButtonWrapper = styled.button<{ $isSecondary?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    ${square("100%")};
    background-color: ${p => (p.$isSecondary ? p.theme.gray900 : p.theme.primary200)};
    color: ${p => p.theme.gray50};
    border-radius: 50%;
    backface-visibility: hidden;
    will-change: transform;

    ${p => hover`
        transform: scale(1.05);
        background-color: ${!p.$isSecondary && p.theme.primary100};
    `};

    &:active {
        transform: scale(1);
        background-color: ${p => !p.$isSecondary && p.theme.primary300};
    }

    &:disabled {
        pointer-events: none;
        background-color: ${p => p.theme.gray400};
    }
`;

interface PlayButtonProps {
    playing?: boolean;
    disabled?: boolean;
    isSecondary?: boolean;
    onClick?: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
    playing,
    isSecondary,
    disabled,
    onClick,
}) => {
    return (
        <ButtonWrapper
            type="button"
            aria-label="Play"
            disabled={disabled}
            $isSecondary={isSecondary}
            onClick={onClick}>
            {playing ? <Pause width="55%" /> : <Play width="55%" />}
        </ButtonWrapper>
    );
};
