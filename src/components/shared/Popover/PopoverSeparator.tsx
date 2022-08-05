import React from "react";
import styled from "styled-components";

const Separator = styled.div`
    height: 0.1rem;
    width: 100%;
    background-color: ${p => p.theme.gray300};
    margin: 0.2rem 0;

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export const PopoverSeparator: React.FC = () => {
    return <Separator />;
};
