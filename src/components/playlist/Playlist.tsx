import React from "react";
import styled from "styled-components";
import { PlaylistHead } from "./PlaylistHead";
import { PlaylistProvider } from "./PlaylistProvider";
import { PlaylistTrackList } from "./PlaylistTrackList";
import { PlaylistControls } from "./PlaylistControls";

const PlaylistWrapper = styled.div``;

const PlaylistBody = styled.div`
    position: relative;
    padding-top: 2.4rem;
    background-color: ${p => p.theme.gray50};
    isolation: isolate;

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 25rem;
        background-color: var(--dominant-color, ${p => p.theme.gray50});
        background-image: linear-gradient(rgba(0, 0, 0, 0.7) 0%, ${p => p.theme.gray50} 100%);
    }
`;

export interface PlaylistProps {
    playlist: SpotifyApi.PlaylistObjectFull;
}

export const Playlist: React.FC<PlaylistProps> = props => {
    const { playlist } = props;

    return (
        <PlaylistProvider {...props}>
            <PlaylistWrapper>
                <PlaylistHead {...playlist} />
                <PlaylistBody>
                    <PlaylistControls owner={playlist.owner} />
                    <PlaylistTrackList />
                </PlaylistBody>
            </PlaylistWrapper>
        </PlaylistProvider>
    );
};
