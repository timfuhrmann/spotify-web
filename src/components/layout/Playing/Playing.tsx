import React from "react";
import styled from "styled-components";
import { PlayingTitle } from "./PlayingTitle";
import { PlayingProvider } from "./PlayingProvider";
import { PlayingControls } from "./PlayingControls";

const PlayingWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 9rem;
    padding: 0 1.6rem;
    background-color: ${p => p.theme.gray50};
    border-top: 0.1rem solid ${p => p.theme.gray200};
`;

export const Playing: React.FC = () => {
    return (
        <PlayingProvider>
            <PlayingWrapper>
                <PlayingTitle />
                <PlayingControls />
                <div></div>
            </PlayingWrapper>
        </PlayingProvider>
    );
};
