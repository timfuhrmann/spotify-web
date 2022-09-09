import React from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";
import { zIndex } from "@css/helper/hierarchy";

const OverlayWrapper = styled.div`
    ${fillParent};
    z-index: ${zIndex.overlay};
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 25%, ${p => p.theme.gray50} 100%);
`;

export const SkeletonOverlay: React.FC = () => {
    return <OverlayWrapper />;
};
