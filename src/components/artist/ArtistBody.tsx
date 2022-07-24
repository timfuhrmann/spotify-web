import React from "react";
import styled from "styled-components";
import { ListControls } from "../shared/ListControls/ListControls";
import { ArtistPopular } from "./ArtistPopular";
import { ListBody } from "../shared/ListBody";
import { ArtistDiscography } from "./ArtistDiscography";
import { ArtistAppears } from "./ArtistAppears";
import { ArtistRelated } from "./ArtistRelated";

const BodyControls = styled.div`
    margin-bottom: 1.2rem;
`;

const BodySection = styled.section`
    margin-bottom: 4rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

interface ArtistBodyProps {
    name: string;
    tracks: SpotifyApi.TrackObjectFull[];
}

export const ArtistBody: React.FC<ArtistBodyProps> = ({ name, tracks }) => {
    return (
        <ListBody>
            <BodyControls>
                <ListControls />
            </BodyControls>
            <BodySection>
                <ArtistPopular tracks={tracks} />
            </BodySection>
            <BodySection>
                <ArtistDiscography />
            </BodySection>
            <BodySection>
                <ArtistAppears name={name} />
            </BodySection>
            <BodySection>
                <ArtistRelated />
            </BodySection>
        </ListBody>
    );
};
