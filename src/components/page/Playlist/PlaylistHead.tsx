import React from "react";
import { ListHead } from "../../shared/ListHead";
import { PlaylistHeadFooter } from "./PlaylistHeadFooter";
import { PlaylistProps } from "./Playlist";
import { usePlaylist } from "./PlaylistProvider";

export const PlaylistHead: React.FC<PlaylistProps> = ({ playlist }) => {
    const { isOwner, setPlaylistDetails } = usePlaylist();

    return (
        <ListHead
            overline="Playlist"
            name={playlist.name}
            images={playlist.images}
            description={playlist.description}
            onDetails={isOwner ? () => setPlaylistDetails(true) : undefined}
            renderFooter={
                <PlaylistHeadFooter
                    owner={playlist.owner}
                    followers={playlist.followers}
                    totalTracks={playlist.tracks.total}
                />
            }
        />
    );
};
