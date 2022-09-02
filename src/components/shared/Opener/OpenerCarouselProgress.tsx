import React, { useRef } from "react";
import styled, { useTheme } from "styled-components";
import { OPENER_DELAY, useOpener } from "./OpenerProvider";

const ProgressCircle = styled.circle`
    stroke-dasharray: 0, 232;
    animation: progress-circle ${OPENER_DELAY / 1000}s linear forwards;

    @keyframes progress-circle {
        0% {
            stroke-dasharray: 0, 232;
        }
        100% {
            stroke-dasharray: 232, 232;
        }
    }
`;

export const OpenerCarouselProgress: React.FC = () => {
    const ref = useRef<SVGCircleElement | null>(null);
    const { gray300, primary200 } = useTheme();
    const { hovered } = useOpener();

    return (
        <svg viewBox="0 0 90 90" width="80" height="80">
            <circle stroke={gray300} strokeWidth="2" fill="none" cx="45" cy="47.5" r="37" />
            <ProgressCircle
                ref={ref}
                stroke={primary200}
                strokeWidth="3"
                fill="none"
                cx="42.5"
                cy="45"
                r="37"
                transform="rotate(-90) translate(-90)"
                style={{ animationPlayState: hovered ? "paused" : "running" }}
            />
        </svg>
    );
};
