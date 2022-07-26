import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";

const DiscographyWrapper = styled.div`
    ${content()};
`;

export const ArtistRelated: React.FC = () => {
    const { relatedArtists } = useArtist();

    return (
        <DiscographyWrapper>
            <ListEntries headline="Fans also like" entries={relatedArtists} type="artist" />
        </DiscographyWrapper>
    );
};
