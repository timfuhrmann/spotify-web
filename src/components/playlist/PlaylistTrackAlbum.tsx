import React from "react";
import styled from "styled-components";
import { hover } from "@css/helper";
import { Link } from "@lib/link";

const AlbumWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
`;

const AlbumName = styled.a`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${p => hover`
        color: ${p.theme.gray900};
        text-decoration: underline;
    `};
`;

export const PlaylistTrackAlbum: React.FC<SpotifyApi.AlbumObjectSimplified> = ({ id, name }) => {
    return (
        <AlbumWrapper>
            <Link href={"/album/" + id} label={name}>
                <AlbumName>{name}</AlbumName>
            </Link>
        </AlbumWrapper>
    );
};
