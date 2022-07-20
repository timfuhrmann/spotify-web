import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { getMainScrollStage } from "@lib/util";
import { Track } from "../shared/Track/Track";
import { useSavedTracks } from "./SavedTracksProvider";

const TracksWrapper = styled.div``;

const TracksBody = styled.div`
    padding: 0 3.2rem;
`;

const TracksList = styled.div<{ $totalTracks: number }>`
    min-height: ${p => `calc(${p.$totalTracks} * ${p.theme.sizes.playlistTrackHeight})`};
`;

export const SavedTracksList: React.FC = () => {
    const { tracks, total, isLoading, hasNextPage, fetchNextPage, handleRemoveTrack } =
        useSavedTracks();

    const handleLoadMore = () => {
        if (isLoading || !hasNextPage) {
            return;
        }

        fetchNextPage();
    };

    return (
        <TracksWrapper>
            {/*<PlaylistTracksHead />*/}
            <TracksBody>
                <TracksList $totalTracks={total}>
                    <InfiniteScroll
                        loadMore={handleLoadMore}
                        hasMore={hasNextPage}
                        threshold={1500}
                        useWindow={isLoading}
                        getScrollParent={getMainScrollStage}>
                        {tracks.map(
                            ({ track, added_at, ...rest }, index) =>
                                track && (
                                    <Track
                                        key={index}
                                        index={index}
                                        isSaved={true}
                                        addedAt={added_at}
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
