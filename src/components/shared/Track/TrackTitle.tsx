import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { SpotifyImage } from "@lib/image";
import { hover, square } from "@css/helper";
import { text } from "@css/helper/typography";
import { Explicit } from "../Explicit";

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    height: 100%;
    min-width: 0;
`;

const TitleCover = styled.div`
    ${square("4rem")};
`;

const TitleFrame = styled.div`
    flex: 1;
    min-width: 0;
`;

const TitleName = styled.div`
    ${text("textMd")};
    line-height: 1.1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${p => p.theme.gray900};
    margin-bottom: 0.2rem;
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

interface PlaylistTrackTitleProps
    extends Pick<SpotifyApi.TrackObjectFull, "name" | "album" | "artists" | "explicit"> {
    hideArtists?: boolean;
}

export const TrackTitle: React.FC<PlaylistTrackTitleProps> = ({
    name,
    album,
    artists,
    explicit,
    hideArtists,
}) => {
    return (
        <TitleWrapper>
            <TitleCover>
                <SpotifyImage alt={name} images={album.images} sizes="40px" />
            </TitleCover>
            <TitleFrame>
                <TitleName>{name}</TitleName>
                <TitleFooter>
                    {explicit && <Explicit />}
                    {!hideArtists && (
                        <TitleArtists>
                            {artists.map((artist, index) => (
                                <React.Fragment key={artist.id}>
                                    <Link href={"/artist/" + artist.id} passHref>
                                        <TitleArtist>{artist.name}</TitleArtist>
                                    </Link>
                                    {index < artists.length - 1 && ", "}
                                </React.Fragment>
                            ))}
                        </TitleArtists>
                    )}
                </TitleFooter>
            </TitleFrame>
        </TitleWrapper>
    );
};