import React from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";

const SkeletonWrapper = styled.span``;

const SkeletonInner = styled.span<{ $fill?: boolean }>`
    position: relative;
    z-index: 1;
    display: inline-flex;
    width: 100%;
    background-color: ${p => p.theme.gray100};
    line-height: 1;
    border-radius: 0.4rem;
    overflow: hidden;
    ${p => p.$fill && fillParent};
`;

interface SkeletonProps {
    fill?: boolean;
}

export const Index: React.FC<SkeletonProps> = ({ fill }) => {
    return (
        <SkeletonWrapper aria-live="polite" aria-busy="true">
            <SkeletonInner $fill={fill}>&zwnj;</SkeletonInner>
        </SkeletonWrapper>
    );
};
