import React from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";

const OverlayWrapper = styled.div`
    ${fillParent};
    z-index: 2;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 25%, ${p => p.theme.gray50} 100%);
`;

export const SkeletonOverlay: React.FC = () => {
    return <OverlayWrapper />;
};
