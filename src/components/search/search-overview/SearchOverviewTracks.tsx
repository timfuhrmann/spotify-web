import React from "react";
import styled from "styled-components";
import { Track } from "../../shared/Track/Track";
import { TrackGrid } from "@css/helper/track";
import { useSearchOverview } from "./SearchOverviewProvider";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { createArray } from "@lib/util";

const TracksList = styled.div`
    ${TrackGrid} {
        grid-template-columns: [index] 1.6rem [first] 6fr [last] minmax(12rem, 1fr);
    }
`;

export const SearchOverviewTracks: React.FC = () => {
    const tracks = useSelector((state: RootState) => state.search.tracks);
    const { savedTracks, handleSaveTrack, handleRemoveTrack } = useSearchOverview();

    return (
        <TracksList
            aria-busy={!tracks}
            aria-rowcount={tracks ? Math.min(4, tracks.total) : 4}
            aria-colcount={3}>
            {tracks ? (
                <React.Fragment>
                    {tracks.items
                        .slice(0, Math.min(4, tracks.total))
                        .map(({ id, name, explicit, duration_ms, album }, index) => (
                            <Track
                                key={index}
                                index={index}
                                id={id}
                                name={name}
                                images={album.images}
                                explicit={explicit}
                                duration_ms={duration_ms}
                                isSaved={savedTracks[index] || false}
                                onSaveTrack={handleSaveTrack}
                                onRemoveTrack={handleRemoveTrack}
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
