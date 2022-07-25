import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";

const AppearsWrapper = styled.div`
    ${content()};
`;

interface ArtistAppearsProps {
    name: string;
}

export const ArtistAppears: React.FC<ArtistAppearsProps> = ({ name }) => {
    const { appearsOn } = useArtist();

    return (
        <AppearsWrapper>
            <ListEntries headline={`Featuring ${name}`} entries={appearsOn} type="album" />
        </AppearsWrapper>
    );
};
