import React from "react";
import styled from "styled-components";
import { Track } from "../shared/Track/Track";
import { useSavedTracks } from "./SavedTracksProvider";
import { ListInfiniteTracks } from "../shared/ListInfiniteTracks/ListInfiniteTracks";

const TracksWrapper = styled.div``;

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
            <ListInfiniteTracks
                columns={5}
                rows={total}
                loadMore={handleLoadMore}
                hasMore={hasNextPage}>
                {tracks.map(
                    ({ track, added_at }, index) =>
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
            </ListInfiniteTracks>
        </TracksWrapper>
    );
};
