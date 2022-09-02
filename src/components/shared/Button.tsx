import React from "react";
import styled, { css } from "styled-components";
import { LinkProps as NextLinkProps } from "next/link";
import { text } from "@css/helper/typography";
import { Link } from "@lib/link";
import { hover } from "@css/helper";

const ButtonPrimaryStyles = css`
    height: 4rem;
    padding: 0 2rem;
    ${text("textSm", "medium")};
    color: ${p => p.theme.gray50};
    background-color: ${p => p.theme.gray900};
    border-radius: 2rem;
    backface-visibility: hidden;
    will-change: transform;

    ${p => hover`
        transform: scale(1.05);
        background-color: ${p.theme.gray800};
    `};

    &:active {
        transform: scale(1);
        background-color: ${p => p.theme.gray800};
    }
`;

const ButtonSecondaryStyles = css`
    ${text("textXs", "bold")};
    color: ${p => p.theme.gray700};
    text-transform: uppercase;

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

const ButtonWrapper = styled.button<{ $variant: ButtonVariant }>`
    ${p => (p.$variant === "secondary" ? ButtonSecondaryStyles : ButtonPrimaryStyles)};
`;

const ButtonLink = styled.a<{ $variant: ButtonVariant }>`
    ${p => (p.$variant === "secondary" ? ButtonSecondaryStyles : ButtonPrimaryStyles)};
`;

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
    label: string;
    variant?: ButtonVariant;
}

interface HTMLLinkProps extends ButtonProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
    as: "a";
    action: URL | string;
    nextLinkProps?: Omit<NextLinkProps, "href" | "passHref">;
}

interface HTMLButtonProps
    extends ButtonProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    as: "button";
    action?: (e: React.MouseEvent) => void;
}

export const Button: React.FC<HTMLLinkProps | HTMLButtonProps> = ({
    label,
    variant = "primary",
    ...props
}) => {
    switch (props.as) {
        case "a": {
            const { as, action, nextLinkProps, ...rest } = props;

            return (
                <Link label={label} href={action} {...nextLinkProps}>
                    <ButtonLink $variant={variant} {...rest}>
                        {label}
                    </ButtonLink>
                </Link>
            );
        }
        default: {
            const { as, action, ...rest } = props;

            return (
                <ButtonWrapper
                    type={action ? "button" : "submit"}
                    $variant={variant}
                    onClick={action}
                    {...rest}>
                    {label}
                </ButtonWrapper>
            );
        }
    }
};
