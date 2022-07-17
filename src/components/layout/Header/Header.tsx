import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
    position: absolute;
    top: 0;
    height: ${p => p.theme.sizes.headerHeight};
`;

export const Header: React.FC = () => {
    return <HeaderWrapper />;
};
