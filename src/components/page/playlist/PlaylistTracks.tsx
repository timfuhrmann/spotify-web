import React from "react";
import { usePlaylist } from "./PlaylistProvider";
import { Track } from "../../shared/Track/Track";
import { ListInfiniteTracks } from "../../shared/ListInfiniteTracks/ListInfiniteTracks";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";
import { useSession } from "@lib/context/session";

interface PlaylistTracksProps {
    owner: SpotifyApi.UserObjectPublic;
}

export const PlaylistTracks: React.FC<PlaylistTracksProps> = ({ owner }) => {
    const { session } = useSession();
    const { isTrackPlaying } = useCurrentTrackSelector();
    const {
        tracks,
        total,
        savedTracks,
        isLoading,
        hasNextPage,
        fetchNextPage,
        handlePlay,
        handleLikeTrack,
        handleUnlikeTrack,
        handleRemove,
    } = usePlaylist();

    const isOwner = session && session.id === owner.id;

    return (
        <ListInfiniteTracks
            columns={5}
            rows={total}
            isLoading={isLoading}
            hasMore={hasNextPage}
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
                            explicit={track.explicit}
                            duration_ms={track.duration_ms}
                            artists={track.artists}
                            images={track.album.images}
                            album={track.album}
                            isSaved={savedTracks[index] || false}
                            isPlaying={isTrackPlaying(track.uri)}
                            onPlay={handlePlay}
                            onRemove={isOwner ? handleRemove : undefined}
                            onLikeTrack={handleLikeTrack}
                            onUnlikeTrack={handleUnlikeTrack}
                        />
                    )
            )}
        </ListInfiniteTracks>
    );
};
