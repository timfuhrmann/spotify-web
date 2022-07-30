import React from "react";
import styled from "styled-components";
import { ListEntries } from "../../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";

const DiscographyWrapper = styled.div`
    ${content()};
    width: 100%;
`;

interface ArtistDiscographyProps {
    id: string;
}

export const ArtistDiscography: React.FC<ArtistDiscographyProps> = ({ id }) => {
    const { albums } = useArtist();

    return (
        <DiscographyWrapper>
            <ListEntries
                type="album"
                headline="Discography"
                entries={albums}
                link={tag => `/artist/${id}/discography${tag ? `/${tag}` : ""}`}
                defaultTag="Popular releases"
                hasTags
            />
        </DiscographyWrapper>
    );
};
