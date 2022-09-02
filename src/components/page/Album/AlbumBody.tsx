import React from "react";
import styled from "styled-components";
import { ListBody } from "../../shared/ListBody";
import { ListControls } from "../../shared/ListControls";
import { AlbumTracks } from "./AlbumTracks";
import { useAlbum } from "./AlbumProvider";
import { ListEntries } from "../../shared/ListEntries/ListEntries";
import { content } from "@css/helper/content";

const BodyAlbums = styled.div`
    ${content()};
    margin-top: 3.2rem;
`;

export const AlbumBody: React.FC = () => {
    const { isFollowing, otherAlbums, artist, handlePlay, handleSaveAlbum, handleRemoveAlbum } =
        useAlbum();

    return (
        <ListBody>
            <ListControls
                onPlay={handlePlay}
                isFollowing={isFollowing}
                onFollow={handleSaveAlbum}
                onUnfollow={handleRemoveAlbum}
            />
            <AlbumTracks />
            {(!otherAlbums || otherAlbums.length !== 0) && (
                <BodyAlbums>
                    <ListEntries
                        type="album"
                        headline={"More by " + artist.name}
                        entries={otherAlbums}
                    />
                </BodyAlbums>
            )}
        </ListBody>
    );
};
