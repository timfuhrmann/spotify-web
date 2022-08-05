import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { text } from "@css/helper/typography";
import { hover } from "@css/helper";
import { Skeleton } from "@lib/skeleton";
import { Volume } from "@icon/Volume";

const ItemWrapper = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 2.4rem;
    color: ${p => p.theme.gray700};
    ${text("textSm")};

    &[aria-current="page"] {
        color: ${p => p.theme.gray900};
    }

    ${p => hover`
        color: ${p.theme.gray900};
    `};

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

const ItemIcon = styled(Volume)`
    width: 1.2rem;
    color: ${p => p.theme.primary200};
`;

interface ParentComposition {
    Skeleton: typeof NavigationPlaylistItemSkeleton;
}

interface NavigationPlaylistItemProps {
    id: string;
    name: string;
    isPlaying: boolean;
}

export const NavigationPlaylistItem: React.FC<NavigationPlaylistItemProps> & ParentComposition = ({
    id,
    name,
    isPlaying,
}) => {
    const { asPath } = useRouter();

    return (
        <Link href={"/playlist/" + id} passHref prefetch={false}>
            <ItemWrapper aria-current={asPath.includes("/playlist/" + id) && "page"}>
                {name}
                {isPlaying && <ItemIcon />}
            </ItemWrapper>
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
