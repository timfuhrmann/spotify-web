import React, { CSSProperties } from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";

const SkeletonWrapper = styled.span``;

const SkeletonInner = styled.span<{ $fill?: boolean; $invisible?: boolean }>`
    display: inline-flex;
    width: 100%;
    max-width: 100%;
    background-color: ${p => p.theme.gray100};
    line-height: 1;
    border-radius: 0.4rem;
    overflow: hidden;
    visibility: ${p => p.$invisible && "hidden"};
    ${p => p.$fill && fillParent};
`;

interface SkeletonProps {
    invisible?: boolean;
    style?: CSSProperties;
    fill?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ style, fill, invisible }) => {
    return (
        <SkeletonInner
            aria-live="polite"
            aria-busy="true"
            style={style}
            $fill={fill}
            $invisible={invisible}>
            &zwnj;
        </SkeletonInner>
    );
};
