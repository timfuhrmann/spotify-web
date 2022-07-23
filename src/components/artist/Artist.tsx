import React from "react";
import styled from "styled-components";
import { ListHead } from "../shared/ListHead/ListHead";
import { ListBody } from "../shared/ListBody";

const ArtistWrapper = styled.div``;

export const Artist: React.FC<SpotifyApi.ArtistObjectFull> = ({ name, images }) => {
    return (
        <ArtistWrapper>
            <ListHead overline="Artist" name={name} images={images} />
            <ListBody />
        </ArtistWrapper>
    );
};
