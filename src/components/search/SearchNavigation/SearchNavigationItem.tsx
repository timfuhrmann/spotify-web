import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "@lib/link";
import { useRouter } from "next/router";
import { hover, transition } from "@css/helper";
import { text } from "@css/helper/typography";
import { pathnameFromAsPath } from "@lib/util";

const ItemLink = styled.a`
    display: inline-flex;
    align-items: center;
    height: 3.2rem;
    padding: 0 1.2rem;
    border-radius: 3rem;
    color: ${p => p.theme.gray900};
    background-color: ${p => p.theme.gray75};
    ${text("textSm")};
    line-height: 1;
    text-transform: capitalize;
    ${transition("background-color", "0.1s")};

    &[aria-current="page"] {
        color: ${p => p.theme.gray50};
        background-color: ${p => p.theme.gray900};
    }

    ${p => hover`
        &:not([aria-current="page"]) {
            background-color: ${p.theme.gray100};
        }
    `};
`;

interface SearchNavigationItemProps {
    label: string;
    type?: string;
}

export const SearchNavigationItem: React.FC<SearchNavigationItemProps> = ({ label, type }) => {
    const { asPath, query, isReady, prefetch } = useRouter();

    const pathname = pathnameFromAsPath(asPath);
    const href = `/browse/search${type ? `/${type}` : ""}`;

    useEffect(() => {
        prefetch(href);
    }, []);

    return (
        <Link label={label} href={isReady ? { pathname: href, query } : undefined} prefetch={false}>
            <ItemLink aria-current={pathname === href && "page"}>{label}</ItemLink>
        </Link>
    );
};
