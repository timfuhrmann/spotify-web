import React, { PropsWithChildren } from "react";
import { default as NextLink, LinkProps } from "next/link";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import { pathnameFromAsPath } from "@lib/util";

interface LabeledLink extends Omit<LinkProps, "href" | "passHref"> {
    label: string;
    href: string | UrlObject | undefined;
    title?: string;
    className?: string;
}

export const Link: React.FC<PropsWithChildren<LabeledLink>> = ({
    label,
    href,
    title,
    children,
    className,
    ...linkProps
}) => {
    if ((!children || !React.isValidElement(children)) && !label) {
        return null;
    }

    if (!href) {
        return <React.Fragment>{children ? children : label}</React.Fragment>;
    }

    const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        "aria-label": label,
        title,
        className,
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
