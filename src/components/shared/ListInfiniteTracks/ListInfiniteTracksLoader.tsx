import React from "react";
import { createArray } from "@lib/util";
import { Track } from "../Track/Track";
import styled from "styled-components";

const LoaderWrapper = styled.div``;

interface ListInfiniteTracksLoaderProps {
    columns: number;
}

export const ListInfiniteTracksLoader: React.FC<ListInfiniteTracksLoaderProps> = ({ columns }) => {
    return (
        <LoaderWrapper aria-hidden>
            {createArray(10).map(index => (
                <Track.Skeleton
                    key={index}
                    hideAlbum={columns === 3}
                    hideAlbumCover={columns === 3}
                    hideAddedAt={columns === 3}
                />
            ))}
        </LoaderWrapper>
    );
};
