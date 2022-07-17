import React, { PropsWithChildren } from "react";
import { default as NextLink, LinkProps } from "next/link";
import { useRouter } from "next/router";

interface LabeledLink extends Omit<LinkProps, "href" | "passHref"> {
    label: string;
    href: string;
    title?: string;
}

export const Link: React.FC<PropsWithChildren<LabeledLink>> = ({
    label,
    href,
    title,
    children,
    ...linkProps
}) => {
    const { asPath } = useRouter();

    if ((!children || !React.isValidElement(children)) && !label) {
        return null;
    }

    if (!href) {
        return <React.Fragment>{children ? children : label}</React.Fragment>;
    }

    const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        "aria-current": asPath === href ? "page" : undefined,
        "aria-label": label,
        title,
    };

    return (
        <NextLink href={href} passHref {...linkProps}>
            {children && React.isValidElement(children) ? (
                React.cloneElement(children, anchorProps)
            ) : (
                <a {...anchorProps}>{label}</a>
            )}
        </NextLink>
    );
};
