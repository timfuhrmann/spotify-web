import React from "react";
import styled from "styled-components";
import { PlayingVolume } from "./PlayingVolume";

const ControlsWrapper = styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.2rem;
    height: 100%;
    min-width: 0;
`;

export const PlayingSecondaryControls: React.FC = () => {
    return (
        <ControlsWrapper>
            <PlayingVolume />
        </ControlsWrapper>
    );
};
