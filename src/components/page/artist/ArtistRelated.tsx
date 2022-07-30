import React from "react";
import styled from "styled-components";
import { ListEntries } from "../../shared/ListEntries/ListEntries";
import { content } from "@css/helper/content";
import { useArtistsRelatedArtistsQuery } from "@lib/api/artist/hook/useArtistsRelatedArtistsQuery";

const DiscographyWrapper = styled.div`
    ${content()};
    width: 100%;
`;

interface ArtistRelatedProps {
    id: string;
}

export const ArtistRelated: React.FC<ArtistRelatedProps> = ({ id }) => {
    const { data: artistRelatedArtists } = useArtistsRelatedArtistsQuery(id);

    return (
        <DiscographyWrapper>
            <ListEntries
                headline="Fans also like"
                entries={artistRelatedArtists ? artistRelatedArtists.artists : null}
                type="artist"
            />
        </DiscographyWrapper>
    );
};
