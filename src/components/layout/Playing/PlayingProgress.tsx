import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@lib/redux";
import { fillParent, hover, square } from "@css/helper";
import { msToMinutesAndSeconds } from "@lib/time";
import { text } from "@css/helper/typography";
import { useProgressBar } from "@lib/hook/useProgressBar";
import { useDurationSelector } from "@lib/redux/reducer/player/hook/useDurationSelector";
import { useProgressMsSelector } from "@lib/redux/reducer/player/hook/useProgressMsSelector";

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
    user-select: none;
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
    transform: scaleX(0);
    transform-origin: left;
    background-color: ${p => p.theme.gray900};
    will-change: transform;
`;

const ProgressKnob = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(-50%, -50%, 0);
    ${square("1.2rem")};
    border-radius: 50%;
    background-color: ${p => p.theme.gray900};
    opacity: 0;
`;

const ProgressBody = styled.div`
    position: relative;
    width: 100%;
    padding: 0.5rem 0;

    ${p => hover`
        ${ProgressInner} {
            background-color: ${p.theme.primary200};
        };

        ${ProgressKnob} {
            opacity: 1;
        };
    `};
`;

export const PlayingProgress: React.FC = () => {
    const dragRef = useProgressBar();
    const duration = useDurationSelector();
    const progress_ms = useProgressMsSelector();

    return (
        <ProgressWrapper>
            <ProgressCurrent>
                {duration > 0 &&
                    msToMinutesAndSeconds(progress_ms ? Math.min(duration, progress_ms) : 0)}
            </ProgressCurrent>
            <ProgressBody ref={dragRef}>
                <ProgressFrame>
                    {progress_ms !== null && (
                        <ProgressInner
                            style={{ transform: `scaleX(${Math.min(1, progress_ms / duration)})` }}
                        />
                    )}
                </ProgressFrame>
                {progress_ms !== null && (
                    <ProgressKnob
                        style={{ left: Math.min(100, (progress_ms / duration) * 100) + "%" }}
                    />
                )}
            </ProgressBody>
            <ProgressLabel>{duration > 0 && msToMinutesAndSeconds(duration)}</ProgressLabel>
        </ProgressWrapper>
    );
};
