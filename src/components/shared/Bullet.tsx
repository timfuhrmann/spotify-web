import React from "react";
import styled from "styled-components";
import { square } from "@css/helper";

const BulletWrapper = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 0 0.6rem;
    line-height: 1;

    &::after {
        content: "";
        ${square("0.4rem")};
        margin-top: 0.2rem;
        border-radius: 50%;
        background-color: currentColor;
    }
`;

export const Bullet: React.FC = () => {
    return <BulletWrapper>&zwnj;</BulletWrapper>;
};
