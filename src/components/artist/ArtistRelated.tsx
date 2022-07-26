import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";

const DiscographyWrapper = styled.div`
    ${content()};
    width: 100%;
`;

export const ArtistRelated: React.FC = () => {
    const { relatedArtists } = useArtist();

    return (
        <DiscographyWrapper>
            <ListEntries headline="Fans also like" entries={relatedArtists} type="artist" />
        </DiscographyWrapper>
    );
};
