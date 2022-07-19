import React from "react";
import styled from "styled-components";
import { square } from "@css/helper";
import { text } from "@css/helper/typography";
import { formatNumber } from "@lib/util";
import { CoverImage } from "../CoverImage";
import { HeaderSpacer } from "../../layout/HeaderSpacer";

const HeadWrapper = styled.div`
    padding-bottom: 2.4rem;
    background: var(--dominant-color);
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, var(--dominant-color) 100%);
`;

const HeadInner = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 2.4rem;
    padding: 0 3.2rem;
`;

const HeadCover = styled.div`
    ${square("23.2rem")};
    box-shadow: 0 0.4rem 6rem rgba(0, 0, 0, 0.5);
`;

const HeadGroup = styled.div`
    flex: 1;
    min-width: 0;
`;

const HeadOverline = styled.div`
    ${text("textXs", "bold")};
    text-transform: uppercase;
`;

const HeadName = styled.div`
    ${text("display3Xl", "black")};
    margin-bottom: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const HeadDescription = styled.div`
    margin-bottom: 0.6rem;
    ${text("textMd")};
    color: ${p => p.theme.gray700};
`;

const HeadInfo = styled.div`
    ${text("textSm")};
`;

const HeadUser = styled.span`
    ${text("textSm", "bold")};
`;

const HeadFollowers = styled.span``;

const HeadSongs = styled.span``;

interface PlaylistHeadProps {
    overline: string;
    name: string;
    images: SpotifyApi.ImageObject[];
    owner: SpotifyApi.UserObjectPublic;
    totalTracks: number;
    description?: string | null;
    year?: string | null;
    followers?: number | null;
}

export const TrackListHead: React.FC<PlaylistHeadProps> = ({
    overline,
    name,
    images,
    owner,
    totalTracks,
    description,
    year,
    followers,
}) => {
    return (
        <HeadWrapper>
            <HeaderSpacer />
            <HeadInner>
                <HeadCover>
                    <CoverImage images={images} alt={name} />
                </HeadCover>
                <HeadGroup>
                    <HeadOverline>{overline}</HeadOverline>
                    <HeadName>{name}</HeadName>
                    {description && <HeadDescription>{description}</HeadDescription>}
                    <HeadInfo>
                        <HeadUser>{owner.display_name}</HeadUser> &#183;{" "}
                        {followers && (
                            <React.Fragment>
                                <HeadFollowers>{formatNumber(followers)} likes</HeadFollowers>{" "}
                                &#183;{" "}
                            </React.Fragment>
                        )}
                        {year && (
                            <React.Fragment>
                                <HeadFollowers>{year}</HeadFollowers> &#183;{" "}
                            </React.Fragment>
                        )}
                        <HeadSongs>{totalTracks} songs</HeadSongs>
                    </HeadInfo>
                </HeadGroup>
            </HeadInner>
        </HeadWrapper>
    );
};
