import React from "react";
import styled from "styled-components";

const Spacer = styled.div`
    height: ${p => p.theme.sizes.headerHeight};
`;

export const HeaderSpacer: React.FC = () => {
    return <Spacer />;
};
