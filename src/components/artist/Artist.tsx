import React from "react";
import { ListHead } from "../shared/ListHead/ListHead";
import styled from "styled-components";

const ArtistWrapper = styled.div``;

export const Artist: React.FC<SpotifyApi.ArtistObjectFull> = ({ name, images }) => {
    return (
        <ArtistWrapper>
            <ListHead overline="Artist" name={name} images={images} />
        </ArtistWrapper>
    );
};
