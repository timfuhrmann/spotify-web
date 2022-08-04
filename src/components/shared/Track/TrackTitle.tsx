import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { SpotifyImage } from "@lib/image";
import { hover, square } from "@css/helper";
import { text } from "@css/helper/typography";
import { Explicit } from "../Explicit";
import { useOverlayScroll } from "@lib/context/overlay-scroll";
import { Skeleton } from "@lib/skeleton";

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    height: 100%;
    min-width: 0;
`;

const TitleCover = styled.div`
    position: relative;
    ${square("4rem")};
    background-color: ${p => p.theme.gray100};
`;

const TitleFrame = styled.div`
    flex: 1;
    min-width: 0;
`;

const TitleName = styled.div<{ $isPlaying?: boolean }>`
    ${text("textMd")};
    line-height: 1.1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${p => (p.$isPlaying ? p.theme.primary300 : p.theme.gray900)};
    margin-bottom: 0.4rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const TitleFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

const TitleArtists = styled.div`
    ${text("textSm")};
    line-height: 1.1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const TitleArtist = styled.a`
    ${p => hover`
        color: ${p.theme.gray900};
        text-decoration: underline;
    `};
`;

interface ParentComposition {
    Skeleton: typeof TrackTitleSkeleton;
}

interface PlaylistTrackTitleProps {
    name: string;
    explicit: boolean;
    isPlaying: boolean;
    artists?: SpotifyApi.ArtistObjectSimplified[];
    images?: SpotifyApi.ImageObject[];
}

export const TrackTitle: React.FC<PlaylistTrackTitleProps> & ParentComposition = ({
    name,
    images,
    artists,
    explicit,
    isPlaying,
}) => {
    const { targetRef } = useOverlayScroll();

    return (
        <TitleWrapper>
            {images && (
                <TitleCover>
                    <SpotifyImage
                        alt={name}
                        images={images}
                        sizes="40px"
                        rootMargin="1000px"
                        rootRef={targetRef}
                        draggable={false}
                    />
                </TitleCover>
            )}
            <TitleFrame>
                <TitleName $isPlaying={isPlaying}>{name}</TitleName>
                {(explicit || artists) && (
                    <TitleFooter>
                        {explicit && <Explicit />}
                        {artists && (
                            <TitleArtists>
                                {artists.map((artist, index) => (
                                    <React.Fragment key={artist.id}>
                                        <Link
                                            href={"/artist/" + artist.id}
                                            passHref
                                            prefetch={false}>
                                            <TitleArtist draggable="false">
                                                {artist.name}
                                            </TitleArtist>
                                        </Link>
                                        {index < artists.length - 1 && ", "}
                                    </React.Fragment>
                                ))}
                            </TitleArtists>
                        )}
                    </TitleFooter>
                )}
            </TitleFrame>
        </TitleWrapper>
    );
};

interface TrackTitleSkeletonProps {
    hideAlbumCover?: boolean;
}

const TrackTitleSkeleton: React.FC<TrackTitleSkeletonProps> = ({ hideAlbumCover }) => {
    return (
        <TitleWrapper>
            {!hideAlbumCover && <TitleCover />}
            <TitleFrame>
                <TitleName>
                    <Skeleton style={{ maxWidth: "50rem" }} />
                </TitleName>
                <TitleFooter>
                    <TitleArtists style={{ flex: "1 1 0" }}>
                        <Skeleton style={{ maxWidth: "50rem" }} />
                    </TitleArtists>
                </TitleFooter>
            </TitleFrame>
        </TitleWrapper>
    );
};

TrackTitle.Skeleton = TrackTitleSkeleton;
