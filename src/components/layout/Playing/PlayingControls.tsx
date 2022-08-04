import React from "react";
import { usePlayer } from "@lib/player";
import styled from "styled-components";
import { PlayingProgress } from "./PlayingProgress";
import { PlayButton } from "../../shared/PlayButton";
import { square } from "@css/helper";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.2rem;
`;

const ControlsHead = styled.div`
    display: flex;
    justify-content: center;
    gap: 2.4rem;
`;

const ControlsPlay = styled.div`
    ${square("3.4rem")};
`;

export const PlayingControls: React.FC = () => {
    const paused = useSelector((state: RootState) => state.player.paused);
    const { previousTrack, nextTrack, togglePlay } = usePlayer();

    return (
        <ControlsWrapper>
            <ControlsHead>
                <button onClick={previousTrack}>prev</button>
                <ControlsPlay>
                    <PlayButton playing={!paused} onClick={togglePlay} isSecondary />
                </ControlsPlay>
                <button onClick={nextTrack}>next</button>
            </ControlsHead>
            <PlayingProgress />
        </ControlsWrapper>
    );
};
