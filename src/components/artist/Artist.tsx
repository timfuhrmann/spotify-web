import React from "react";
import { ArtistHead } from "./ArtistHead";

export const Artist: React.FC<SpotifyApi.ArtistObjectFull> = ({ name, images }) => {
    return (
        <div style={{ minHeight: "200vh" }}>
            <ArtistHead name={name} images={images} />
        </div>
    );
};
