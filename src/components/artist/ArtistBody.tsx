import React from "react";
import styled from "styled-components";
import { ListControls } from "../shared/ListControls/ListControls";
import { ArtistPopular } from "./ArtistPopular";
import { ListBody } from "../shared/ListBody";
import { ArtistDiscography } from "./ArtistDiscography";
import { ArtistAppears } from "./ArtistAppears";
import { ArtistRelated } from "./ArtistRelated";
import { useArtist } from "./ArtistProvider";

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
    id: string;
    tracks: SpotifyApi.TrackObjectFull[];
}

export const ArtistBody: React.FC<ArtistBodyProps> = ({ id, name, tracks }) => {
    const { isFollowing, handleFollowArtist, handleUnfollowArtist } = useArtist();

    return (
        <ListBody>
            <BodyControls>
                <ListControls
                    isFollowing={isFollowing}
                    onFollow={handleFollowArtist}
                    onUnfollow={handleUnfollowArtist}
                />
            </BodyControls>
            <BodySection>
                <ArtistPopular tracks={tracks} />
            </BodySection>
            <BodySection>
                <ArtistDiscography id={id} />
            </BodySection>
            <BodySection>
                <ArtistAppears id={id} name={name} />
            </BodySection>
            <BodySection>
                <ArtistRelated />
            </BodySection>
        </ListBody>
    );
};
