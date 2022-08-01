import React from "react";
import { PlaylistProvider, usePlaylist, withPlaylist } from "./PlaylistProvider";
import { ListHead } from "../../shared/ListHead/ListHead";
import { PlaylistBody } from "./PlaylistBody";
import { PlaylistHeadFooter } from "./PlaylistHeadFooter";

export const Playlist = withPlaylist(() => {
    const { playlist } = usePlaylist();

    return (
        <PlaylistProvider>
            {playlist ? (
                <ListHead
                    overline="Playlist"
                    name={playlist.name}
                    images={playlist.images}
                    description={playlist.description}
                    renderFooter={
                        <PlaylistHeadFooter
                            owner={playlist.owner}
                            followers={playlist.followers}
                            totalTracks={playlist.tracks.total}
                        />
                    }
                />
            ) : (
                <ListHead.Skeleton />
            )}
            <PlaylistBody />
        </PlaylistProvider>
    );
});
