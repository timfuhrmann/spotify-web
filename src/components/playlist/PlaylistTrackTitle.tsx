import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { CoverImage } from "../shared/CoverImage";
import { hover, square } from "@css/helper";
import { text } from "@css/helper/typography";
import { Explicit } from "../shared/Explicit";

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

export const PlaylistTrackTitle: React.FC<
    Pick<SpotifyApi.TrackObjectFull, "name" | "album" | "artists" | "explicit">
> = ({ name, album, artists, explicit }) => {
    return (
        <TitleWrapper>
            <TitleCover>
                <CoverImage alt={name} images={album.images} />
            </TitleCover>
            <TitleFrame>
                <TitleName>{name}</TitleName>
                <TitleFooter>
                    {explicit && <Explicit />}
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
                </TitleFooter>
            </TitleFrame>
        </TitleWrapper>
    );
};
