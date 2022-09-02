import React from "react";
import { ListControls } from "../../shared/ListControls";
import { PlaylistTracks } from "./PlaylistTracks";
import { usePlaylist } from "./PlaylistProvider";
import { ListBody } from "../../shared/ListBody";
import { PlaylistProps } from "./Playlist";

export const PlaylistBody: React.FC<PlaylistProps> = ({ playlist }) => {
    const { isFollowing, handlePlay, handleFollowPlaylist, handleUnfollowPlaylist } = usePlaylist();

    return (
        <ListBody>
            <ListControls
                owner={playlist.owner}
                isFollowing={isFollowing}
                onPlay={handlePlay}
                onFollow={handleFollowPlaylist}
                onUnfollow={handleUnfollowPlaylist}
            />
            <PlaylistTracks />
        </ListBody>
    );
};
