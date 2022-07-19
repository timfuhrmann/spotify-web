import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { PlaylistTrack } from "./PlaylistTrack";
import { usePlaylist } from "./PlaylistProvider";
import { PlaylistTracksHead } from "./PlaylistTracksHead";
import { getMainScrollStage } from "@lib/util";

const TracksWrapper = styled.div``;

const TracksBody = styled.div`
    padding: 0 3.2rem;
`;

const TracksList = styled.div<{ $totalTracks: number }>`
    min-height: ${p => `calc(${p.$totalTracks} * ${p.theme.sizes.playlistTrackHeight})`};
`;

export const PlaylistTracks: React.FC = () => {
    const { tracks, total, savedTracks, fetchNextPage, isLoading, hasNextPage } = usePlaylist();

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
                        {tracks.map((item, index) => (
                            <PlaylistTrack
                                key={index}
                                index={index}
                                saved={savedTracks[index]}
                                {...item}
                            />
                        ))}
                    </InfiniteScroll>
                </TracksList>
            </TracksBody>
        </TracksWrapper>
    );
};
