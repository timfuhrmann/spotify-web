import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const SkeletonOuter = styled.span`
    display: inline-flex;
    pointer-events: none;
`;

export const SkeletonWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return <SkeletonOuter>{children}</SkeletonOuter>;
};
