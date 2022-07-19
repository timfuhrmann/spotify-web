import React from "react";
import styled from "styled-components";
import { PlaylistProvider } from "./PlaylistProvider";
import { ListHead } from "../shared/ListHead/ListHead";
import { PlaylistBody } from "./PlaylistBody";
import { PlaylistHeadFooter } from "./PlaylistHeadFooter";

const PlaylistWrapper = styled.div``;

export interface PlaylistProps {
    playlist: SpotifyApi.PlaylistObjectFull;
}

export const Playlist: React.FC<PlaylistProps> = props => {
    const { playlist } = props;

    return (
        <PlaylistProvider {...props}>
            <PlaylistWrapper>
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
                <PlaylistBody owner={playlist.owner} />
            </PlaylistWrapper>
        </PlaylistProvider>
    );
};
