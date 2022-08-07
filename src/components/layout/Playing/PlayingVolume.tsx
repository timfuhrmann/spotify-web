import React from "react";
import styled from "styled-components";
import { Progress } from "../../shared/Progress";
import { useVolumeSelector } from "@lib/redux/reducer/player/hook/useVolumeSelector";
import { useVolumeProgressBar } from "@lib/hook/useVolumeProgressBar";
import { Volume } from "@icon/Volume";
import { hover } from "@css/helper";
import { usePlaying } from "./PlayingProvider";
import { useMutedSelector } from "@lib/redux/reducer/player/hook/useMutedSelector";
import { VolumeMuted } from "@icon/VolumeMuted";
import { useVolumeDraggingSelector } from "@lib/redux/reducer/player/hook/useVolumeDraggingSelector";

const VolumeWrapper = styled.div`
    flex: 0 1 12.5rem;
    display: flex;
    align-items: center;
`;

const VolumeButton = styled.button`
    display: inline-flex;
    padding-right: 1.2rem;
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
    `};

    &:disabled {
        pointer-events: none;
        color: ${p => p.theme.gray400};
    }
`;

const VolumeFrame = styled.div`
    width: 100%;
`;

export const PlayingVolume: React.FC = () => {
    const muted = useMutedSelector();
    const volume = useVolumeSelector();
    const dragging = useVolumeDraggingSelector();
    const dragRef = useVolumeProgressBar();
    const { isDisabled, handleMute, handleUnmute } = usePlaying();

    return (
        <VolumeWrapper>
            {muted ? (
                <VolumeButton
                    type="button"
                    aria-label="Unmute"
                    disabled={isDisabled}
                    onClick={() => handleUnmute(volume)}>
                    <VolumeMuted width="16" aria-hidden />
                </VolumeButton>
            ) : (
                <VolumeButton
                    type="button"
                    aria-label="Mute"
                    disabled={isDisabled}
                    onClick={handleMute}>
                    <Volume width="16" aria-hidden />
                </VolumeButton>
            )}
            <VolumeFrame>
                <Progress
                    ref={dragRef}
                    progress={isDisabled || muted ? 0 : volume}
                    dragging={dragging}
                />
            </VolumeFrame>
        </VolumeWrapper>
    );
};
