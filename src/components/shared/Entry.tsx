import React, { NamedExoticComponent } from "react";
import styled from "styled-components";
import { SpotifyImage } from "@lib/image";
import { aspectRatio, fillParent, hover, square, transition } from "@css/helper";
import { text } from "@css/helper/typography";
import { Link } from "@lib/link";
import { PlayButton } from "./PlayButton";
import { Skeleton } from "@lib/skeleton";
import { SkeletonWrapper } from "@lib/skeleton/wrapper";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";

const EntryPlay = styled.div`
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

const EntryWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 1.2rem;
    background-color: ${p => p.theme.gray75};
    border-radius: 0.4rem;
    min-width: 0;
    ${transition("background-color", "0.1s")};

    ${p => hover`
        background-color: ${p.theme.gray100};
      
        ${EntryPlay} {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    `};
`;

const EntryImage = styled.div<{ $type: EntryType }>`
    position: relative;
    ${aspectRatio(1)};
    border-radius: ${p => (p.$type === "artist" ? "50%" : "0.4rem")};
    background-color: ${p => p.theme.gray100};
    overflow: hidden;
    transform: translateZ(0);
`;

const EntryFrame = styled.div`
    position: relative;
    margin-bottom: 1.2rem;
`;

const EntryName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${text("textMd", "bold")};
    line-height: 1.2;
`;

const EntryAnchor = styled.a`
    ${fillParent};
`;

interface ParentComposition {
    Skeleton: typeof ListEntriesItemSkeleton;
}

export type EntryType = "album" | "playlist" | "artist" | "category";

export interface EntryProps {
    type: EntryType;
    id: string;
    name: string;
    images: SpotifyApi.ImageObject[];
    uri?: string;
}

const BaseEntry: React.FC<EntryProps> = ({ id, uri, name, images, type }) => {
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();

    return (
        <EntryWrapper>
            <EntryFrame>
                <EntryImage $type={type}>
                    <SpotifyImage images={images} alt={name} sizes="300px" />
                </EntryImage>
                {type !== "category" && uri && (
                    <EntryPlay>
                        <PlayButton onClick={() => mutatePlay({ context_uri: uri })} />
                    </EntryPlay>
                )}
            </EntryFrame>
            <EntryName>{name}</EntryName>
            <Link label={name} href={`/${type}/${id}`} prefetch={false}>
                <EntryAnchor />
            </Link>
        </EntryWrapper>
    );
};

export const Entry = React.memo(BaseEntry) as NamedExoticComponent<EntryProps> & ParentComposition;

const ListEntriesItemSkeleton: React.FC<Pick<EntryProps, "type">> = ({ type }) => {
    return (
        <SkeletonWrapper>
            <EntryWrapper>
                <EntryFrame>
                    <EntryImage $type={type} />
                </EntryFrame>
                <EntryName>
                    <Skeleton />
                </EntryName>
            </EntryWrapper>
        </SkeletonWrapper>
    );
};

Entry.Skeleton = ListEntriesItemSkeleton;
Entry.displayName = "Entry";
