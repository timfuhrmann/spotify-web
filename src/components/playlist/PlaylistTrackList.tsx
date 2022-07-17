import React from "react";
import styled from "styled-components";
import { PlaylistTrack } from "./PlaylistTrack";
import { usePlaylist } from "./PlaylistProvider";

const ListWrapper = styled.div<{ $totalTracks: number }>`
    height: ${p => `calc(${p.$totalTracks} * ${p.theme.sizes.playlistTrackHeight})`};
    padding: 0 3.2rem;
`;

export const PlaylistTrackList: React.FC = () => {
    const { tracks, totalTracks } = usePlaylist();

    return (
        <ListWrapper $totalTracks={totalTracks}>
            {tracks.map((item, index) => (
                <PlaylistTrack key={item.track.id + index} index={index} {...item} />
            ))}
        </ListWrapper>
    );
};
