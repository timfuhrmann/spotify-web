import React from "react";
import styled from "styled-components";
import { SpotifyImage } from "@lib/image";
import { aspectRatio, fillParent, hover, square, transition } from "@css/helper";
import { text } from "@css/helper/typography";
import { Link } from "@lib/link";
import { PlayButton } from "../PlayButton";
import { EntryType } from "./ListEntries";
import { Index } from "@lib/skeleton";
import { SkeletonWrapper } from "@lib/skeleton/wrapper";

const AlbumPlay = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 0.8rem;
    right: 0.8rem;
    ${square("4.8rem")};
    transform: translate3d(0, 0.8rem, 0);
    opacity: 0;
    ${transition("transform, opacity", "0.2s")};

    @media (hover: none) {
        opacity: 1;
        transform: none;
    }
`;

const AlbumWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 1.2rem;
    background-color: ${p => p.theme.gray75};
    border-radius: 0.4rem;
    min-width: 0;
    ${transition("background-color", "0.1s")};

    ${p => hover`
        background-color: ${p.theme.gray100};
      
        ${AlbumPlay} {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    `};
`;

const AlbumFrame = styled.div<{ $type: EntryType }>`
    position: relative;
    ${aspectRatio(1)};
    margin-bottom: 1.2rem;
    border-radius: ${p => (p.$type === "artist" ? "50%" : "0.4rem")};
    background-color: ${p => p.theme.gray100};
    overflow: hidden;
    transform: translateZ(0);
`;

const AlbumName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${text("textMd", "bold")};
    line-height: 1.2;
`;

const AlbumAnchor = styled.a`
    ${fillParent};
`;

interface ParentComposition {
    Skeleton: typeof ListEntriesItemSkeleton;
}

export interface ListEntriesItemProps {
    id: string;
    name: string;
    images: SpotifyApi.ImageObject[];
    type: EntryType;
}

export const ListEntriesItem: React.FC<ListEntriesItemProps> & ParentComposition = ({
    id,
    name,
    images,
    type,
}) => {
    return (
        <AlbumWrapper>
            <AlbumFrame $type={type}>
                <SpotifyImage images={images} alt={name} />
                <AlbumPlay>
                    <PlayButton />
                </AlbumPlay>
            </AlbumFrame>
            <AlbumName>{name}</AlbumName>
            <Link label={name} href={`/${type}/${id}`}>
                <AlbumAnchor />
            </Link>
        </AlbumWrapper>
    );
};

const ListEntriesItemSkeleton: React.FC<Pick<ListEntriesItemProps, "type">> = ({ type }) => {
    return (
        <SkeletonWrapper>
            <AlbumWrapper>
                <AlbumFrame $type={type}>
                    <Index fill />
                </AlbumFrame>
                <AlbumName>
                    <Index />
                </AlbumName>
            </AlbumWrapper>
        </SkeletonWrapper>
    );
};

ListEntriesItem.Skeleton = ListEntriesItemSkeleton;
