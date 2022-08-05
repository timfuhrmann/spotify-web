import React from "react";
import { usePlayer } from "@lib/player";
import styled from "styled-components";
import { PlayingProgress } from "./PlayingProgress";
import { PlayButton } from "../../shared/PlayButton";
import { hover, square } from "@css/helper";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { PreviousTrack } from "@icon/PreviousTrack";
import { NextTrack } from "@icon/NextTrack";
import { usePlaybackPauseMutation } from "@lib/api/player/usePlaybackPauseMutation";
import { usePlaying } from "./PlayingProvider";
import { useStartResumePlaybackMutation } from "@lib/api/player/useStartResumePlaybackMutation";

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

const ControlsButton = styled.button`
    display: inline-flex;
    margin: auto 0;
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

export const PlayingControls: React.FC = () => {
    const paused = useSelector((state: RootState) => state.player.paused);
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();
    const { mutate: mutatePause } = usePlaybackPauseMutation();
    const { device_id, activeDevice, previousTrack, nextTrack, togglePlay } = usePlayer();

    const handleTogglePlay = () => {
        if (activeDevice && activeDevice.id !== device_id) {
            if (paused) {
                mutatePlay({});
            } else {
                mutatePause();
            }
        } else {
            togglePlay();
        }
    };

    return (
        <ControlsWrapper>
            <ControlsHead>
                <ControlsButton type="button" aria-label="Previous Track" onClick={previousTrack}>
                    <PreviousTrack width="16" aria-hidden />
                </ControlsButton>
                <ControlsPlay>
                    <PlayButton playing={!paused} onClick={handleTogglePlay} isSecondary />
                </ControlsPlay>
                <ControlsButton type="button" aria-label="Next Track" onClick={nextTrack}>
                    <NextTrack width="16" aria-hidden />
                </ControlsButton>
            </ControlsHead>
            <PlayingProgress />
        </ControlsWrapper>
    );
};
