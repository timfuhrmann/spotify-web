import React from "react";
import { ListControls } from "../../shared/ListControls/ListControls";
import { PlaylistTracks } from "./PlaylistTracks";
import { usePlaylist } from "./PlaylistProvider";
import { ListBody } from "../../shared/ListBody";

export const PlaylistBody: React.FC = () => {
    const { playlist, isFollowing, handleFollowPlaylist, handleUnfollowPlaylist } = usePlaylist();

    return (
        <ListBody>
            {playlist ? (
                <ListControls
                    owner={playlist.owner}
                    isFollowing={isFollowing}
                    onFollow={handleFollowPlaylist}
                    onUnfollow={handleUnfollowPlaylist}
                />
            ) : (
                <ListControls.Skeleton />
            )}
            <PlaylistTracks />
        </ListBody>
    );
};
