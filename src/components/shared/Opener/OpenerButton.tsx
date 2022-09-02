import React from "react";
import styled from "styled-components";
import { Link } from "@lib/link";
import { text } from "@css/helper/typography";
import { hover } from "@css/helper";
import { Logo } from "@icon/Logo";

const ButtonWrapper = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    height: 5rem;
    padding: 0 2.5rem;
    ${text("textLg", "medium")};
    background-color: ${p => p.theme.primary300};
    border-radius: 2.5rem;
    backface-visibility: hidden;
    will-change: transform;

    ${hover`
        transform: scale(1.02);
    `};

    &:active {
        transform: scale(1);
    }
`;

export const OpenerButton: React.FC = () => {
    return (
        <Link label="Login with Spotify" href="/api/auth/login">
            <ButtonWrapper>
                <Logo width="20" />
                Login with Spotify
            </ButtonWrapper>
        </Link>
    );
};
