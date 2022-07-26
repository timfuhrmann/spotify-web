import React, { CSSProperties } from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";

const SkeletonWrapper = styled.span``;

const SkeletonInner = styled.span<{ $fill?: boolean }>`
    position: relative;
    z-index: 1;
    display: inline-flex;
    width: 100%;
    max-width: 100%;
    background-color: ${p => p.theme.gray100};
    line-height: 1;
    border-radius: 0.4rem;
    overflow: hidden;
    ${p => p.$fill && fillParent};
`;

interface SkeletonProps {
    style?: CSSProperties;
    fill?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ style, fill }) => {
    return (
        <SkeletonWrapper aria-live="polite" aria-busy="true">
            <SkeletonInner style={style} $fill={fill}>
                &zwnj;
            </SkeletonInner>
        </SkeletonWrapper>
    );
};
