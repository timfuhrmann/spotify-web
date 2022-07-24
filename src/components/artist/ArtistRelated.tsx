import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";

const DiscographyWrapper = styled.div`
    padding: 0 3.2rem;
`;

export const ArtistRelated: React.FC = () => {
    const { relatedArtists } = useArtist();

    if (!relatedArtists) {
        return null;
    }

    return (
        <DiscographyWrapper>
            <ListEntries headline="Fans also like" entries={relatedArtists} type="artist" />
        </DiscographyWrapper>
    );
};
