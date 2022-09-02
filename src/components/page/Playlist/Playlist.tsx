import React from "react";
import { PlaylistProvider } from "./PlaylistProvider";
import { PlaylistBody } from "./PlaylistBody";
import { PlaylistHead } from "./PlaylistHead";

export interface PlaylistProps {
    playlist: SpotifyApi.PlaylistObjectFull;
}

export const Playlist: React.FC<PlaylistProps> = props => {
    const { playlist } = props;

    return (
        <PlaylistProvider {...props}>
            <PlaylistHead {...props} />
            <PlaylistBody owner={playlist.owner} />
        </PlaylistProvider>
    );
};
