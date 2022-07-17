import React from "react";
import styled from "styled-components";
import { PlaylistTrackAlbum } from "./PlaylistTrackAlbum";
import { PlaylistTrackTitle } from "./PlaylistTrackTitle";
import { text } from "@css/helper/typography";
import { SafeTrack } from "./PlaylistProvider";
import { dateToTimeString, msToMinutesAndSeconds } from "@lib/time";

const TrackWrapper = styled.button`
    display: grid;
    height: ${p => p.theme.sizes.playlistTrackHeight};
    padding: 0 1.6rem;
    grid-gap: 1.8rem;
    grid-template-columns: [index] 1.6rem [title] 6fr [album] 4fr [time] 3fr [duration] minmax(
            12rem,
            1fr
        );

    border-radius: 0.4rem;
    color: ${p => p.theme.gray700};
    ${text("textSm")};

    &:focus {
        color: ${p => p.theme.gray900};
        background-color: ${p => p.theme.gray400};
    }
`;

const TrackIndex = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    ${text("textMd")};
`;

const TrackTime = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const TrackDuration = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

interface TrackProps extends SafeTrack {
    index: number;
}

export const PlaylistTrack: React.FC<TrackProps> = ({ index, track, added_at }) => {
    const { name, album, artists, explicit, duration_ms } = track;

    return (
        <TrackWrapper>
            <TrackIndex>{index + 1}</TrackIndex>
            <PlaylistTrackTitle name={name} album={album} artists={artists} explicit={explicit} />
            <PlaylistTrackAlbum {...album} />
            <TrackTime>{dateToTimeString(added_at)}</TrackTime>
            <TrackDuration>{msToMinutesAndSeconds(duration_ms)}</TrackDuration>
        </TrackWrapper>
    );
};
