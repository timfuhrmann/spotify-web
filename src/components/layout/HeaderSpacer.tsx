import React from "react";
import styled from "styled-components";

const Spacer = styled.div`
    height: ${p => p.theme.sizes.headerHeight / 10}rem;
    margin-bottom: 2.4rem;
`;

export const HeaderSpacer: React.FC = () => {
    return <Spacer />;
};
