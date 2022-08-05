import React from "react";
import styled from "styled-components";
import { Track } from "../../shared/Track/Track";
import { useAlbum } from "./AlbumProvider";
import { text } from "@css/helper/typography";
import { TrackGrid } from "@css/helper/track";
import { ListInfiniteTracks } from "../../shared/ListInfiniteTracks/ListInfiniteTracks";
import { Disc } from "@icon/Disc";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";

const TracksWrapper = styled.div``;

const TracksDisc = styled.div``;

const TracksHead = styled(TrackGrid)`
    ${text("textMd", "bold")};
    color: ${p => p.theme.gray700};
`;

const TracksColumn = styled.div`
    display: flex;
    align-items: center;
`;

const TracksIndex = styled(TracksColumn)`
    justify-content: flex-end;
`;

export const AlbumTracks: React.FC = () => {
    const { isTrackPlaying } = useCurrentTrackSelector();
    const {
        total,
        discs,
        savedTracks,
        isLoading,
        handlePlay,
        hasNextPage,
        fetchNextPage,
        handleSaveTrack,
        handleRemoveTrack,
    } = useAlbum();

    const hasDisc = Object.keys(discs).length > 1;

    return (
        <TracksWrapper>
            <ListInfiniteTracks
                columns={3}
                rows={hasDisc ? total + Object.keys(discs).length : total}
                isLoading={isLoading}
                hasMore={hasNextPage}
                loadMore={fetchNextPage}>
                {Object.keys(discs).map(discNumber => (
                    <TracksDisc key={discNumber} role="rowgroup" aria-label={`Disc ${discNumber}`}>
                        {hasDisc && (
                            <TracksHead>
                                <TracksIndex>
                                    <Disc width="16" />
                                </TracksIndex>
                                <TracksColumn>Disc {discNumber}</TracksColumn>
                            </TracksHead>
                        )}
                        <React.Fragment>
                            {discs[discNumber].map(
                                ({ uri, id, name, explicit, duration_ms, artists }, index) => (
                                    <Track
                                        key={index}
                                        index={index}
                                        id={id}
                                        uri={uri}
                                        name={name}
                                        explicit={explicit}
                                        duration_ms={duration_ms}
                                        artists={artists}
                                        isPlaying={isTrackPlaying(uri)}
                                        isSaved={savedTracks[index] || false}
                                        onPlay={handlePlay}
                                        onSaveTrack={handleSaveTrack}
                                        onRemoveTrack={handleRemoveTrack}
                                    />
                                )
                            )}
                        </React.Fragment>
                    </TracksDisc>
                ))}
            </ListInfiniteTracks>
        </TracksWrapper>
    );
};
