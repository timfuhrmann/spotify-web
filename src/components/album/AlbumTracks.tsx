import React from "react";
import styled from "styled-components";
import { Track } from "../shared/Track/Track";
import { useAlbum } from "./AlbumProvider";
import { text } from "@css/helper/typography";
import { TrackGrid } from "@css/helper/track";
import { ListInfiniteTracks } from "../shared/ListInfiniteTracks/ListInfiniteTracks";
import { Disc } from "@icon/Disc";

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
    const {
        total,
        discs,
        savedTracks,
        isLoading,
        hasNextPage,
        fetchNextPage,
        handleSaveTrack,
        handleRemoveTrack,
    } = useAlbum();

    const hasDisc = Object.keys(discs).length > 1;

    const handleLoadMore = () => {
        if (isLoading || !hasNextPage) {
            return;
        }

        fetchNextPage();
    };

    return (
        <TracksWrapper>
            <ListInfiniteTracks
                loadMore={handleLoadMore}
                hasMore={hasNextPage}
                rows={hasDisc ? total + Object.keys(discs).length : total}
                columns={3}>
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
                        {discs[discNumber].map(
                            ({ id, name, explicit, duration_ms, artists }, index) => (
                                <Track
                                    key={index}
                                    index={index}
                                    name={name}
                                    explicit={explicit}
                                    duration_ms={duration_ms}
                                    artists={artists}
                                    isSaved={savedTracks[index]}
                                    onSaveTrack={() => handleSaveTrack(id, index)}
                                    onRemoveTrack={() => handleRemoveTrack(id, index)}
                                />
                            )
                        )}
                    </TracksDisc>
                ))}
            </ListInfiniteTracks>
        </TracksWrapper>
    );
};
