import React from "react";
import styled from "styled-components";

const ExplicitWrapper = styled.span`
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
    line-height: 1;
    color: ${p => p.theme.gray50};
    background-color: ${p => p.theme.gray700};
    border-radius: 0.2rem;
`;

export const Explicit: React.FC = () => {
    return <ExplicitWrapper aria-label="Explicit">E</ExplicitWrapper>;
};
