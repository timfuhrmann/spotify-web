import React from "react";
import styled from "styled-components";
import { PlayingProgress } from "./PlayingProgress";
import { PlayButton } from "../../shared/PlayButton";
import { hover, square } from "@css/helper";
import { PreviousTrack } from "@icon/PreviousTrack";
import { NextTrack } from "@icon/NextTrack";
import { Repeat } from "@icon/Repeat";
import { usePausedSelector } from "@lib/redux/reducer/player/hook/usePausedSelector";
import { useRepeatModeSelector } from "@lib/redux/reducer/player/hook/useRepeatModeSelector";
import { Shuffle } from "@icon/Shuffle";
import { useShuffleSelector } from "@lib/redux/reducer/player/hook/useShuffleSelector";
import { usePlaying } from "./PlayingProvider";
import { usePlayer } from "@lib/player";

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

const ControlsButton = styled.button<{ $highlighted?: boolean }>`
    display: inline-flex;
    margin: auto 0;
    color: ${p => (p.$highlighted ? p.theme.primary300 : p.theme.gray700)};

    ${p => hover`
        color: ${p.$highlighted ? p.theme.primary200 : p.theme.gray900};
    `};

    &:disabled {
        pointer-events: none;
        color: ${p => p.theme.gray400};
    }
`;

export const PlayingControls: React.FC = () => {
    const paused = usePausedSelector();
    const shuffle = useShuffleSelector();
    const repeatMode = useRepeatModeSelector();
    const { isDisabled, handleShuffle, handleRepeat } = usePlaying();
    const { togglePlay, nextTrack, previousTrack } = usePlayer();

    return (
        <ControlsWrapper>
            <ControlsHead>
                <ControlsButton
                    type="button"
                    aria-label="Toggle shuffle"
                    disabled={isDisabled}
                    $highlighted={shuffle}
                    onClick={handleShuffle}>
                    <Shuffle width="16" aria-hidden />
                </ControlsButton>
                <ControlsButton
                    type="button"
                    aria-label="Previous Track"
                    disabled={isDisabled}
                    onClick={previousTrack}>
                    <PreviousTrack width="16" aria-hidden />
                </ControlsButton>
                <ControlsPlay>
                    <PlayButton
                        playing={!paused}
                        disabled={isDisabled}
                        onClick={togglePlay}
                        isSecondary
                    />
                </ControlsPlay>
                <ControlsButton
                    type="button"
                    aria-label="Next Track"
                    disabled={isDisabled}
                    onClick={nextTrack}>
                    <NextTrack width="16" aria-hidden />
                </ControlsButton>
                <ControlsButton
                    type="button"
                    aria-label="Change repeat mode"
                    disabled={isDisabled}
                    $highlighted={repeatMode !== "off"}
                    onClick={handleRepeat}>
                    <Repeat type={repeatMode} width="16" aria-hidden />
                </ControlsButton>
            </ControlsHead>
            <PlayingProgress />
        </ControlsWrapper>
    );
};
