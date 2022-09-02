import React from "react";
import styled from "styled-components";
import { Track } from "../../shared/Track/Track";
import { TrackGrid } from "@css/helper/track";
import { useSearchOverview } from "./SearchOverviewProvider";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { createArray } from "@lib/util";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";

const TracksList = styled.div`
    ${TrackGrid} {
        grid-template-columns: [index] 1.6rem [first] 6fr [last] minmax(12rem, 1fr);
    }
`;

export const SearchOverviewTracks: React.FC = () => {
    const tracks = useSelector((state: RootState) => state.search.tracks);
    const { isTrackPlaying } = useCurrentTrackSelector();
    const { savedTracks, handlePlay, handleLikeTrack, handleUnlikeTrack } = useSearchOverview();

    return (
        <TracksList
            aria-busy={!tracks}
            aria-rowcount={tracks ? Math.min(4, tracks.total) : 4}
            aria-colcount={3}>
            {tracks ? (
                <React.Fragment>
                    {tracks.items
                        .slice(0, Math.min(4, tracks.total))
                        .map(({ id, uri, name, explicit, duration_ms, album, artists }, index) => (
                            <Track
                                key={index}
                                index={index}
                                id={id}
                                uri={uri}
                                name={name}
                                images={album.images}
                                artists={artists}
                                explicit={explicit}
                                duration_ms={duration_ms}
                                isPlaying={isTrackPlaying(uri)}
                                isSaved={savedTracks[index] || false}
                                onPlay={handlePlay}
                                onLikeTrack={handleLikeTrack}
                                onUnlikeTrack={handleUnlikeTrack}
                            />
                        ))}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {createArray(4).map(index => (
                        <Track.Skeleton key={index} hideAlbum hideAddedAt />
                    ))}
                </React.Fragment>
            )}
        </TracksList>
    );
};
