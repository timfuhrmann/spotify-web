import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { fillParent } from "@css/helper";
import { msToMinutesAndSeconds } from "@lib/time";
import { text } from "@css/helper/typography";

const ProgressWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const ProgressLabel = styled.div`
    min-width: 5ch;
    color: ${p => p.theme.gray700};
    ${text("textSm")};
    line-height: 1;
`;

const ProgressCurrent = styled(ProgressLabel)`
    display: flex;
    justify-content: flex-end;
`;

const ProgressFrame = styled.div`
    position: relative;
    width: 100%;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: ${p => p.theme.gray300};
    overflow: hidden;
    transform: translateZ(0);
`;

const ProgressInner = styled.div`
    ${fillParent};
    transform: scaleX(0.5);
    transform-origin: left;
    background-color: ${p => p.theme.gray900};
    will-change: transform;
`;

export const PlayingProgress: React.FC = () => {
    const { duration, progress_ms } = useSelector((state: RootState) => state.player);

    return (
        <ProgressWrapper>
            <ProgressCurrent>{msToMinutesAndSeconds(progress_ms || 0)}</ProgressCurrent>
            <ProgressFrame>
                {progress_ms !== null && progress_ms > 0 && (
                    <ProgressInner style={{ transform: `scaleX(${progress_ms / duration})` }} />
                )}
            </ProgressFrame>
            <ProgressLabel>{msToMinutesAndSeconds(duration)}</ProgressLabel>
        </ProgressWrapper>
    );
};
