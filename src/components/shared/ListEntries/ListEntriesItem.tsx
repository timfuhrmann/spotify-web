import React from "react";
import styled from "styled-components";
import { SpotifyImage } from "@lib/image";
import { aspectRatio, fillParent, hover, square, transition } from "@css/helper";
import { text } from "@css/helper/typography";
import { Link } from "@lib/link";
import { PlayButton } from "../PlayButton";
import { EntryType } from "./ListEntries";

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

const AlbumFrame = styled.div`
    position: relative;
`;

const AlbumImage = styled.div<{ $type: EntryType }>`
    position: relative;
    ${aspectRatio(1)};
    border-radius: ${p => (p.$type === "artist" ? "50%" : "0.4rem")};
    background-color: ${p => p.theme.gray200};
    overflow: hidden;
    transform: translateZ(0);
    margin-bottom: 1.2rem;
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

export interface ListEntriesItemProps {
    id: string;
    name: string;
    images: SpotifyApi.ImageObject[];
    type: EntryType;
}

export const ListEntriesItem: React.FC<ListEntriesItemProps> = ({ id, name, images, type }) => {
    return (
        <AlbumWrapper>
            <AlbumFrame>
                <AlbumImage $type={type}>
                    <SpotifyImage images={images} alt={name} />
                </AlbumImage>
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
