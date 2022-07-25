import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";

const DiscographyWrapper = styled.div`
    ${content()};
`;

export const ArtistDiscography: React.FC = () => {
    const { albums } = useArtist();

    return (
        <DiscographyWrapper>
            <ListEntries headline="Discography" entries={albums} type="album" />
        </DiscographyWrapper>
    );
};
