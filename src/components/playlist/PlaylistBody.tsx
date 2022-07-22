import React from "react";
import { ListControls } from "../shared/ListControls/ListControls";
import { PlaylistTracks } from "./PlaylistTracks";
import { usePlaylist } from "./PlaylistProvider";
import { ListBody } from "../shared/ListBody";

export const PlaylistBody: React.FC<Pick<SpotifyApi.PlaylistObjectFull, "owner">> = ({ owner }) => {
    const { isFollowing, handleFollowPlaylist, handleUnfollowPlaylist } = usePlaylist();

    return (
        <ListBody>
            <ListControls
                owner={owner}
                isFollowing={isFollowing}
                onFollow={handleFollowPlaylist}
                onUnfollow={handleUnfollowPlaylist}
            />
            <PlaylistTracks />
        </ListBody>
    );
};
