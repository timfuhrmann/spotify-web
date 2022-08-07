import React from "react";
import styled from "styled-components";
import { hover } from "@css/helper";
import { Link } from "@lib/link";
import { Skeleton } from "@lib/skeleton";

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

interface ParentComposition {
    Skeleton: typeof TrackAlbumSkeleton;
}

export const TrackAlbum: React.FC<SpotifyApi.AlbumObjectSimplified> & ParentComposition = ({
    id,
    name,
}) => {
    return (
        <AlbumWrapper>
            <Link href={"/album/" + id} label={name} prefetch={false}>
                <AlbumName>{name}</AlbumName>
            </Link>
        </AlbumWrapper>
    );
};

const TrackAlbumSkeleton: React.FC = () => {
    return (
        <AlbumWrapper>
            <div style={{ flex: "1 1 0" }}>
                <Skeleton />
            </div>
        </AlbumWrapper>
    );
};

TrackAlbum.Skeleton = TrackAlbumSkeleton;
