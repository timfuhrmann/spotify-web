import React from "react";
import styled from "styled-components";
import { TrackGrid } from "@css/helper/track";
import { Track } from "../../shared/Track/Track";
import { useArtist } from "./ArtistProvider";
import { text } from "@css/helper/typography";
import { content } from "@css/helper/content";
import { Button } from "../../shared/Button";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";

const PopularWrapper = styled.div`
    ${content()};
    width: 100%;
`;

const PopularHeadline = styled.h2`
    ${text("displayXs", "bold")};
    margin-bottom: 2.4rem;
`;

const PopularList = styled.div`
    max-width: 100rem;
    margin-bottom: 1.2rem;

    &:last-child {
        margin-bottom: 0;
    }

    ${TrackGrid} {
        grid-template-columns: [index] 1.6rem [first] 6fr [last] minmax(12rem, 1fr);
    }
`;

const PopularButton = styled.div`
    padding: 0 1.6rem;
`;

interface ArtistPopularProps {
    tracks: SpotifyApi.TrackObjectFull[];
}

export const ArtistPopular: React.FC<ArtistPopularProps> = ({ tracks }) => {
    const { isTrackPlaying } = useCurrentTrackSelector();
    const {
        savedTracks,
        popularTracksLength,
        hasMorePopularTracks,
        hasLessPopularTracks,
        showMorePopularTracks,
        showLessPopularTracks,
        handlePlay,
        handleLikeTrack,
        handleUnlikeTrack,
    } = useArtist();

    return (
        <PopularWrapper>
            <PopularHeadline>Popular</PopularHeadline>
            <PopularList aria-rowcount={popularTracksLength} aria-colcount={3}>
                {tracks
                    .slice(0, popularTracksLength)
                    .map(({ uri, id, name, explicit, duration_ms, album }, index) => (
                        <Track
                            key={index}
                            index={index}
                            id={id}
                            uri={uri}
                            name={name}
                            images={album.images}
                            explicit={explicit}
                            duration_ms={duration_ms}
                            isPlaying={isTrackPlaying(uri)}
                            isSaved={savedTracks[index] || false}
                            onPlay={handlePlay}
                            onLikeTrack={handleLikeTrack}
                            onUnlikeTrack={handleUnlikeTrack}
                        />
                    ))}
            </PopularList>
            {hasMorePopularTracks && (
                <PopularButton>
                    <Button
                        as="button"
                        label="Show more"
                        action={showMorePopularTracks}
                        variant="secondary"
                    />
                </PopularButton>
            )}
            {hasLessPopularTracks && (
                <PopularButton>
                    <Button
                        as="button"
                        label="Show less"
                        action={showLessPopularTracks}
                        variant="secondary"
                    />
                </PopularButton>
            )}
        </PopularWrapper>
    );
};
