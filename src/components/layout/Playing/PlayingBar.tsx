import React from "react";
import styled from "styled-components";
import { PlayingTitle } from "./PlayingTitle";
import { PlayingControls } from "./PlayingControls";
import { PlayingSecondaryControls } from "./PlayingSecondaryControls";

const BarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 9rem;
    padding: 0 1.6rem;
    background-color: ${p => p.theme.gray50};
    border-top: 0.1rem solid ${p => p.theme.gray200};
`;

export const PlayingBar: React.FC = () => {
    return (
        <BarWrapper>
            <PlayingTitle />
            <PlayingControls />
            <PlayingSecondaryControls />
        </BarWrapper>
    );
};
