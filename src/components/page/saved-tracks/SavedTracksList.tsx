import React from "react";
import styled from "styled-components";
import { Track } from "../../shared/Track/Track";
import { useSavedTracks } from "./SavedTracksProvider";
import { ListInfiniteTracks } from "../../shared/ListInfiniteTracks/ListInfiniteTracks";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";

const TracksWrapper = styled.div``;

export const SavedTracksList: React.FC = () => {
    const { isTrackPlaying } = useCurrentTrackSelector();
    const { tracks, total, isLoading, hasNextPage, fetchNextPage, handlePlay, handleRemoveTrack } =
        useSavedTracks();

    return (
        <TracksWrapper>
            <ListInfiniteTracks
                columns={5}
                rows={total}
                hasMore={hasNextPage}
                isLoading={isLoading}
                loadMore={fetchNextPage}>
                {tracks.map(
                    ({ track, added_at }, index) =>
                        track && (
                            <Track
                                key={index}
                                index={index}
                                addedAt={added_at}
                                id={track.id}
                                uri={track.uri}
                                name={track.name}
                                images={track.album.images}
                                explicit={track.explicit}
                                duration_ms={track.duration_ms}
                                artists={track.artists}
                                album={track.album}
                                isPlaying={isTrackPlaying(track.uri)}
                                isSaved={true}
                                onPlay={handlePlay}
                                onRemoveTrack={handleRemoveTrack}
                            />
                        )
                )}
            </ListInfiniteTracks>
        </TracksWrapper>
    );
};
