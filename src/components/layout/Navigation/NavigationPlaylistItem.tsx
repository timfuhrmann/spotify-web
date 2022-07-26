import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { hover } from "@css/helper";
import { Skeleton } from "@lib/skeleton";

const ItemWrapper = styled.a<{ $active?: boolean }>`
    display: block;
    padding: 0.6rem 2.4rem;
    color: ${p => (p.$active ? p.theme.gray900 : p.theme.gray700)};
    ${text("textSm")};

    ${p => hover`
        color: ${p.theme.gray900};
    `};

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

interface ParentComposition {
    Skeleton: typeof NavigationPlaylistItemSkeleton;
}

interface NavigationPlaylistItemProps {
    id: string;
    name: string;
}

export const NavigationPlaylistItem: React.FC<NavigationPlaylistItemProps> & ParentComposition = ({
    id,
    name,
}) => {
    const { asPath } = useRouter();

    return (
        <Link href={"/playlist/" + id} passHref>
            <ItemWrapper $active={asPath.includes("/playlist/" + id)}>{name}</ItemWrapper>
        </Link>
    );
};

const NavigationPlaylistItemSkeleton: React.FC<{ width: number }> = ({ width }) => {
    return (
        <ItemWrapper as="div">
            <Skeleton style={{ width: width + "%" }} />
        </ItemWrapper>
    );
};

NavigationPlaylistItem.Skeleton = NavigationPlaylistItemSkeleton;
