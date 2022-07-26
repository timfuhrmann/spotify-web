import React from "react";
import styled, { css } from "styled-components";
import { LinkProps as NextLinkProps } from "next/link";
import { text } from "@css/helper/typography";
import { Link } from "@lib/link";
import { hover } from "@css/helper";

const ButtonStyles = css`
    ${text("textXs", "bold")};
    color: ${p => p.theme.gray700};
    text-transform: uppercase;

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

const ButtonWrapper = styled.button`
    ${ButtonStyles};
`;

const ButtonLink = styled.a`
    ${ButtonStyles};
`;

interface SecondaryButtonProps {
    label: string;
}

interface HTMLLinkProps
    extends SecondaryButtonProps,
        React.AnchorHTMLAttributes<HTMLAnchorElement> {
    as: "a";
    action: URL | string;
    nextLinkProps?: Omit<NextLinkProps, "href" | "passHref">;
}

interface HTMLButtonProps
    extends SecondaryButtonProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    as: "button";
    action: (e: React.MouseEvent) => void;
}

export const SecondaryButton: React.FC<HTMLLinkProps | HTMLButtonProps> = ({ label, ...props }) => {
    switch (props.as) {
        case "a": {
            const { as, action, nextLinkProps, ...rest } = props;

            return (
                <Link label={label} href={action} {...nextLinkProps}>
                    <ButtonLink {...rest}>{label}</ButtonLink>
                </Link>
            );
        }
        default: {
            const { as, action, ...rest } = props;

            return (
                <ButtonWrapper type="button" onClick={action} {...rest}>
                    {label}
                </ButtonWrapper>
            );
        }
    }
};
