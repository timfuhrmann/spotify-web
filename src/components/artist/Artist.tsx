import React from "react";
import { ListHead } from "../shared/ListHead/ListHead";
import { formatNumber } from "@lib/format";
import { ArtistProvider } from "./ArtistProvider";
import { ArtistBody } from "./ArtistBody";

export interface ArtistProps {
    artist: SpotifyApi.ArtistObjectFull;
    topTracks: SpotifyApi.TrackObjectFull[];
}

export const Artist: React.FC<ArtistProps> = props => {
    const { name, images, followers } = props.artist;

    return (
        <ArtistProvider {...props}>
            <ListHead
                overline="Artist"
                name={name}
                images={images}
                renderFooter={<div>{formatNumber(followers.total)} followers</div>}
            />
            <ArtistBody name={name} tracks={props.topTracks} />
        </ArtistProvider>
    );
};
