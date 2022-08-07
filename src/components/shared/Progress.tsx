import React from "react";
import styled from "styled-components";
import { fillParent, hover, square } from "@css/helper";

const ProgressFrame = styled.div`
    position: relative;
    width: 100%;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: ${p => p.theme.gray300};
    overflow: hidden;
    transform: translateZ(0);
`;

const ProgressInner = styled.div<{ $active: boolean }>`
    ${fillParent};
    transform: scaleX(0);
    transform-origin: left;
    background-color: ${p => (p.$active ? p.theme.primary200 : p.theme.gray900)};
    will-change: transform;
`;

const ProgressKnob = styled.div<{ $active: boolean }>`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(-50%, -50%, 0);
    ${square("1.2rem")};
    border-radius: 50%;
    background-color: ${p => p.theme.gray900};
    opacity: ${p => (p.$active ? 1 : 0)};
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

interface ProgressProps {
    progress: number | null;
    dragging: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ progress, dragging }, ref) => {
        return (
            <ProgressBody ref={ref}>
                <ProgressFrame>
                    {progress !== null && (
                        <ProgressInner
                            style={{ transform: `scaleX(${Math.min(1, progress)})` }}
                            $active={dragging}
                        />
                    )}
                </ProgressFrame>
                {progress !== null && (
                    <ProgressKnob
                        style={{ left: Math.min(100, progress * 100) + "%" }}
                        $active={dragging}
                    />
                )}
            </ProgressBody>
        );
    }
);

Progress.displayName = "Progress";
