import React from "react";
import styled from "styled-components";
import { msToMinutesAndSeconds } from "@lib/time";
import { text } from "@css/helper/typography";
import { useDurationSelector } from "@lib/redux/reducer/player/hook/useDurationSelector";
import { useProgressMsSelector } from "@lib/redux/reducer/player/hook/useProgressMsSelector";
import { useTrackProgressBar } from "@lib/hook/useTrackProgressBar";
import { Progress } from "../../shared/Progress";
import { useTrackDraggingSelector } from "@lib/redux/reducer/player/hook/useTrackDraggingSelector";

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

export const PlayingProgress: React.FC = () => {
    const duration = useDurationSelector();
    const progress_ms = useProgressMsSelector();
    const dragging = useTrackDraggingSelector();
    const dragRef = useTrackProgressBar();

    return (
        <ProgressWrapper>
            <ProgressCurrent>
                {duration > 0 &&
                    msToMinutesAndSeconds(progress_ms ? Math.min(duration, progress_ms) : 0)}
            </ProgressCurrent>
            <Progress
                ref={dragRef}
                progress={progress_ms ? progress_ms / duration : null}
                dragging={dragging}
            />
            <ProgressLabel>{duration > 0 && msToMinutesAndSeconds(duration)}</ProgressLabel>
        </ProgressWrapper>
    );
};
