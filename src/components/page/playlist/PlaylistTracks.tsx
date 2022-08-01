import React from "react";
import { usePlaylist } from "./PlaylistProvider";
import { Track } from "../../shared/Track/Track";
import { ListInfiniteTracks } from "../../shared/ListInfiniteTracks/ListInfiniteTracks";

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
        <ListInfiniteTracks
            columns={5}
            rows={tracks ? tracks.length : null}
            totalRows={total ? total : null}
            loadMore={handleLoadMore}
            hasMore={hasNextPage}>
            {tracks.map(
                ({ track, added_at }, index) =>
                    track && (
                        <Track
                            key={index}
                            index={index}
                            isSaved={savedTracks[index] || false}
                            addedAt={added_at}
                            id={track.id}
                            name={track.name}
                            explicit={track.explicit}
                            duration_ms={track.duration_ms}
                            artists={track.artists}
                            images={track.album.images}
                            album={track.album}
                            onSaveTrack={handleSaveTrack}
                            onRemoveTrack={handleRemoveTrack}
                        />
                    )
            )}
        </ListInfiniteTracks>
    );
};
