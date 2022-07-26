import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";

const AppearsWrapper = styled.div`
    ${content()};
`;

interface ArtistAppearsProps {
    id: string;
    name: string;
}

export const ArtistAppears: React.FC<ArtistAppearsProps> = ({ id, name }) => {
    const { appearsOn } = useArtist();

    return (
        <AppearsWrapper>
            <ListEntries
                headline={`Featuring ${name}`}
                entries={appearsOn}
                type="album"
                link={`/artist/${id}/discography/appears_on`}
            />
        </AppearsWrapper>
    );
};
