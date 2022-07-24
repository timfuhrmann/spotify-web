import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";

const DiscographyWrapper = styled.div`
    padding: 0 3.2rem;
`;

export const ArtistDiscography: React.FC = () => {
    const { albums } = useArtist();

    if (!albums) {
        return null;
    }

    return (
        <DiscographyWrapper>
            <ListEntries headline="Discography" entries={albums} type="album" />
        </DiscographyWrapper>
    );
};
