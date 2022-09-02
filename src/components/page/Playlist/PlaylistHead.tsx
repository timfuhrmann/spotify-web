import React from "react";
import { ListHead } from "../../shared/ListHead/ListHead";
import { PlaylistHeadFooter } from "./PlaylistHeadFooter";
import { PlaylistProps } from "./Playlist";
import { usePlaylist } from "./PlaylistProvider";

export const PlaylistHead: React.FC<PlaylistProps> = ({ playlist }) => {
    const { setPlaylistDetails } = usePlaylist();

    return (
        <ListHead
            overline="Playlist"
            name={playlist.name}
            images={playlist.images}
            description={playlist.description}
            onDetails={() => setPlaylistDetails(true)}
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
