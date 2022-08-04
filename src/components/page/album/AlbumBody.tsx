import React from "react";
import { ListBody } from "../../shared/ListBody";
import { ListControls } from "../../shared/ListControls/ListControls";
import { AlbumTracks } from "./AlbumTracks";
import { useAlbum } from "./AlbumProvider";

export const AlbumBody: React.FC = () => {
    const { isFollowing, handlePlay, handleSaveAlbum, handleRemoveAlbum } = useAlbum();

    return (
        <ListBody>
            <ListControls
                onPlay={handlePlay}
                isFollowing={isFollowing}
                onFollow={handleSaveAlbum}
                onUnfollow={handleRemoveAlbum}
            />
            <AlbumTracks />
        </ListBody>
    );
};
