import React from "react";
import styled from "styled-components";
import { Track } from "../../shared/Track/Track";
import { TrackGrid } from "@css/helper/track";
import { useSearchOverview } from "./SearchOverviewProvider";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

const TracksList = styled.div`
    ${TrackGrid} {
        grid-template-columns: [index] 1.6rem [first] 6fr [last] minmax(12rem, 1fr);
    }
`;

export const SearchOverviewTracks: React.FC = () => {
    const tracks = useSelector((state: RootState) => state.search.tracks);
    const { savedTracks, handleSaveTrack, handleRemoveTrack } = useSearchOverview();

    if (!tracks) {
        return null;
    }

    return (
        <TracksList aria-rowcount={Math.min(4, tracks.total)} aria-colcount={3}>
            {tracks.items
                .slice(0, Math.min(4, tracks.total))
                .map(({ id, name, explicit, duration_ms, album }, index) => (
                    <Track
                        key={index}
                        index={index}
                        id={id}
                        name={name}
                        album={album}
                        explicit={explicit}
                        duration_ms={duration_ms}
                        isSaved={savedTracks[index] || false}
                        onSaveTrack={handleSaveTrack}
                        onRemoveTrack={handleRemoveTrack}
                        hideAlbum
                    />
                ))}
        </TracksList>
    );
};
