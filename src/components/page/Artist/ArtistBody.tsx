import React from "react";
import styled from "styled-components";
import { ListControls } from "../../shared/ListControls/ListControls";
import { ArtistPopular } from "./ArtistPopular";
import { ListBody } from "../../shared/ListBody";
import { ArtistDiscography } from "./ArtistDiscography";
import { ArtistAppears } from "./ArtistAppears";
import { ArtistRelated } from "./ArtistRelated";
import { useArtist } from "./ArtistProvider";

const BodyControls = styled.div`
    margin-bottom: 1.2rem;
`;

const BodyGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4.2rem;
`;

const BodyPopular = styled.div`
    padding-bottom: 1.2rem;
`;

interface ArtistBodyProps {
    name: string;
    id: string;
    tracks: SpotifyApi.TrackObjectFull[];
}

export const ArtistBody: React.FC<ArtistBodyProps> = ({ id, name, tracks }) => {
    const { isFollowing, handlePlay, handleFollowArtist, handleUnfollowArtist } = useArtist();

    return (
        <ListBody>
            <BodyControls>
                <ListControls
                    onPlay={handlePlay}
                    isFollowing={isFollowing}
                    onFollow={handleFollowArtist}
                    onUnfollow={handleUnfollowArtist}
                />
            </BodyControls>
            <BodyGrid>
                <BodyPopular>
                    <ArtistPopular tracks={tracks} />
                </BodyPopular>
                <ArtistDiscography id={id} />
                <ArtistAppears id={id} name={name} />
                <ArtistRelated id={id} />
            </BodyGrid>
        </ListBody>
    );
};
