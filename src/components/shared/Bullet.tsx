import styled from "styled-components";
import { square } from "@css/helper";
import React from "react";
import { displayValue } from "react-query/types/devtools/utils";

const BulletWrapper = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 0 0.6rem;
    line-height: 1;

    &::after {
        content: "";
        ${square("0.4rem")};
        border-radius: 50%;
        background-color: currentColor;
    }
`;

export const Bullet: React.FC = () => {
    return <BulletWrapper>&zwnj;</BulletWrapper>;
};
