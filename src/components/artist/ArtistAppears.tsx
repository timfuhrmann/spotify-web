import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";

const AppearsWrapper = styled.section`
    padding: 0 3.2rem;
`;

interface ArtistAppearsProps {
    name: string;
}

export const ArtistAppears: React.FC<ArtistAppearsProps> = ({ name }) => {
    const { appearsOn } = useArtist();

    if (!appearsOn) {
        return null;
    }

    return (
        <AppearsWrapper>
            <ListEntries headline={`Featuring ${name}`} entries={appearsOn} type="album" />
        </AppearsWrapper>
    );
};