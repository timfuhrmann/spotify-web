import React from "react";
import { ListHead } from "../../shared/ListHead";
import { AlbumHeadFooter } from "./AlbumHeadFooter";
import { AlbumProvider } from "./AlbumProvider";
import { AlbumBody } from "./AlbumBody";

export interface AlbumProps {
    album: SpotifyApi.AlbumObjectFull;
}

export const Album: React.FC<AlbumProps> = props => {
    const { album } = props;

    return (
        <AlbumProvider {...props}>
            <ListHead
                overline="Album"
                name={album.name}
                images={album.images}
                renderFooter={<AlbumHeadFooter artists={album.artists} />}
            />
            <AlbumBody />
        </AlbumProvider>
    );
};
