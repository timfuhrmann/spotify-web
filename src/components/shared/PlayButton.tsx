import React from "react";
import styled from "styled-components";
import { hover, square } from "@css/helper";
import { Play } from "@icon/Play";

const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    ${square("100%")};
    background-color: ${p => p.theme.primary200};
    color: ${p => p.theme.gray50};
    border-radius: 50%;

    ${p => hover`
        transform: scale(1.05);
        background-color: ${p.theme.primary100};
    `};

    &:active {
        transform: scale(1);
        background-color: ${p => p.theme.primary300};
    }
`;

export const PlayButton: React.FC = () => {
    return (
        <ButtonWrapper type="button">
            <Play width="50%" />
        </ButtonWrapper>
    );
};
