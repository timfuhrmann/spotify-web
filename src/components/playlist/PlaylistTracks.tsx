import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { usePlaylist } from "./PlaylistProvider";
import { PlaylistTracksHead } from "./PlaylistTracksHead";
import { getMainScrollStage } from "@lib/util";
import { Track } from "../shared/Track/Track";

const TracksWrapper = styled.div``;

const TracksBody = styled.div`
    padding: 0 3.2rem;
`;

const TracksList = styled.div<{ $totalTracks: number }>`
    min-height: ${p => `calc(${p.$totalTracks} * ${p.theme.sizes.playlistTrackHeight})`};
`;

export const PlaylistTracks: React.FC = () => {
    const {
        tracks,
        total,
        savedTracks,
        isLoading,
        hasNextPage,
        fetchNextPage,
        handleSaveTrack,
        handleRemoveTrack,
    } = usePlaylist();

    const handleLoadMore = () => {
        if (isLoading || !hasNextPage) {
            return;
        }

        fetchNextPage();
    };

    return (
        <TracksWrapper>
            <PlaylistTracksHead />
            <TracksBody>
                <TracksList $totalTracks={total}>
                    <InfiniteScroll
                        loadMore={handleLoadMore}
                        hasMore={hasNextPage}
                        threshold={1500}
                        useWindow={false}
                        getScrollParent={getMainScrollStage}>
                        {tracks.map(
                            ({ track, added_at }, index) =>
                                track && (
                                    <Track
                                        key={index}
                                        index={index}
                                        isSaved={savedTracks[index]}
                                        addedAt={added_at}
                                        onSaveTrack={() => handleSaveTrack(track.id, index)}
                                        onRemoveTrack={() => handleRemoveTrack(track.id, index)}
                                        {...track}
                                    />
                                )
                        )}
                    </InfiniteScroll>
                </TracksList>
            </TracksBody>
        </TracksWrapper>
    );
};
