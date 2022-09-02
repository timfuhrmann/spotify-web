import React, { NamedExoticComponent, useState } from "react";
import styled from "styled-components";
import { TrackTitle } from "./TrackTitle";
import { TrackAlbum } from "./TrackAlbum";
import { dateToTimeString, msToMinutesAndSeconds } from "@lib/time";
import { Play } from "@icon/Play";
import { text } from "@css/helper/typography";
import { hover } from "@css/helper";
import { FollowHeart } from "@icon/FollowHeart";
import { UnfollowHeart } from "@icon/UnfollowHeart";
import { TrackGrid } from "@css/helper/track";
import { SkeletonWrapper } from "@lib/skeleton/wrapper";
import { Skeleton } from "@lib/skeleton";
import { Pause } from "@icon/Pause";
import { TrackPopover } from "./TrackPopover";
import { More } from "@icon/More";

const TrackPlay = styled.button`
    display: none;
`;

const TrackPlaying = styled.img`
    position: absolute;
    width: 1.4rem;
`;

const TrackNumber = styled.span<{ $isPlaying: boolean }>`
    display: ${p => p.$isPlaying && "none"};
`;

const TrackLikeButton = styled.button`
    display: flex;
    opacity: 0;

    @media (hover: none) {
        opacity: 1;
    }
`;

const TrackIndex = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    ${text("textMd")};
`;

const TrackTime = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const TrackDuration = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.6rem;
    height: 100%;
`;

const TrackDurationText = styled.div`
    display: flex;
    justify-content: flex-end;
    font-variant-numeric: tabular-nums;
    width: 5ch;
`;

const TrackSave = styled(FollowHeart)`
    width: 1.8rem;
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

const TrackRemove = styled(UnfollowHeart)`
    width: 1.8rem;
    color: ${p => p.theme.primary200};

    ${p => hover`
        color: ${p.theme.primary100};
    `};
`;

const TrackMore = styled.button`
    display: flex;
    margin: 0 auto;
    opacity: 0;

    @media (hover: none) {
        opacity: 1;
    }
`;

const TrackWrapper = styled(TrackGrid)`
    border-radius: 0.4rem;
    color: ${p => p.theme.gray700};
    ${text("textSm")};

    ${p => hover`
        color: ${p.theme.gray900};
        background-color: ${p.theme.gray100};
        
        ${TrackPlay} {
            display: flex;
        }
      
        ${TrackLikeButton},
        ${TrackMore} {
           opacity: 1;
        }
        
        ${TrackNumber},
        ${TrackPlaying} {
            display: none;
        }
  `};

    &:focus,
    &[aria-selected="true"] {
        color: ${p => p.theme.gray900};
        background-color: ${p => p.theme.gray400};

        ${TrackPlay} {
            display: flex;
        }

        ${TrackLikeButton},
        ${TrackMore} {
            opacity: 1;
        }

        ${TrackNumber},
        ${TrackPlaying} {
            display: none;
        }
    }
`;

interface ParentComposition {
    Skeleton: typeof TrackSkeleton;
}

export interface PopoverPosition {
    x: number;
    y: number;
}

interface TrackProps {
    index: number;
    id: string;
    uri: string;
    name: string;
    explicit: boolean;
    duration_ms: number;
    isSaved: boolean;
    isPlaying: boolean;
    images?: SpotifyApi.ImageObject[];
    artists?: SpotifyApi.ArtistObjectSimplified[];
    album?: SpotifyApi.AlbumObjectSimplified;
    addedAt?: string;
    onPlay?: (index: number) => void;
    onRemove?: (uri: string, index: number) => void;
    onLikeTrack?: (id: string, index: number) => void;
    onUnlikeTrack?: (id: string, index: number) => void;
}

// @ts-ignore
export const Track: NamedExoticComponent<TrackProps> & ParentComposition = React.memo(
    ({
        index,
        id,
        uri,
        name,
        images,
        album,
        artists,
        explicit,
        duration_ms,
        isSaved,
        isPlaying,
        addedAt,
        onPlay,
        onRemove,
        onLikeTrack,
        onUnlikeTrack,
    }) => {
        const [popoverPosition, setPopoverPosition] = useState<PopoverPosition | null>(null);
        const [isFocused, setIsFocused] = useState<boolean>(false);

        const handlePlay = () => {
            if (!onPlay) {
                return;
            }

            onPlay(index);
        };

        const handleContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            setPopoverPosition({ x: e.clientX, y: e.clientY });
        };

        return (
            <React.Fragment>
                {popoverPosition && (
                    <TrackPopover
                        uri={uri}
                        position={popoverPosition}
                        artists={artists}
                        isSaved={isSaved}
                        onRemove={onRemove && (() => onRemove(uri, index))}
                        onLikeTrack={onLikeTrack && (() => onLikeTrack(id, index))}
                        onUnlikeTrack={onUnlikeTrack && (() => onUnlikeTrack(id, index))}
                        onClose={() => setPopoverPosition(null)}
                    />
                )}
                <TrackWrapper
                    role="row"
                    aria-selected={isFocused}
                    aria-rowindex={index}
                    tabIndex={0}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onDoubleClick={handlePlay}
                    onContextMenu={handleContextMenu}>
                    <TrackIndex>
                        {isPlaying && (
                            <TrackPlaying src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" />
                        )}
                        <TrackNumber $isPlaying={isPlaying}>{index + 1}</TrackNumber>
                        <TrackPlay type="button" onClick={handlePlay}>
                            {isPlaying ? <Pause width="16" /> : <Play width="16" />}
                        </TrackPlay>
                    </TrackIndex>
                    <TrackTitle
                        name={name}
                        images={images}
                        artists={artists}
                        explicit={explicit}
                        isPlaying={isPlaying}
                    />
                    {album && <TrackAlbum {...album} />}
                    {addedAt && <TrackTime>{dateToTimeString(addedAt)}</TrackTime>}
                    <TrackDuration>
                        {isSaved ? (
                            <TrackLikeButton
                                title="Remove from library"
                                aria-label="Remove from library"
                                onClick={() => onUnlikeTrack && onUnlikeTrack(id, index)}>
                                <TrackRemove />
                            </TrackLikeButton>
                        ) : (
                            <TrackLikeButton
                                title="Add to library"
                                aria-label="Add to library"
                                onClick={() => onUnlikeTrack && onUnlikeTrack(id, index)}>
                                <TrackSave />
                            </TrackLikeButton>
                        )}
                        <TrackDurationText>{msToMinutesAndSeconds(duration_ms)}</TrackDurationText>
                        <TrackMore
                            type="button"
                            aria-label="More settings"
                            onClick={handleContextMenu}>
                            <More width="16" aria-hidden />
                        </TrackMore>
                    </TrackDuration>
                </TrackWrapper>
            </React.Fragment>
        );
    }
);

interface TrackSkeletonProps {
    hideAlbum?: boolean;
    hideAlbumCover?: boolean;
    hideAddedAt?: boolean;
}

export const TrackSkeleton: React.FC<TrackSkeletonProps> = ({
    hideAlbum,
    hideAddedAt,
    hideAlbumCover,
}) => {
    return (
        <SkeletonWrapper>
            <TrackWrapper>
                <TrackIndex>
                    <div style={{ flex: "1 1 0" }}>
                        <Skeleton />
                    </div>
                </TrackIndex>
                <TrackTitle.Skeleton hideAlbumCover={hideAlbumCover} />
                {!hideAlbum && <TrackAlbum.Skeleton />}
                {!hideAddedAt && (
                    <TrackTime>
                        <div style={{ flex: "1 1 0" }}>
                            <Skeleton />
                        </div>
                    </TrackTime>
                )}
                <TrackDuration>
                    <TrackDurationText>
                        <div style={{ flex: "1 1 0" }}>
                            <Skeleton />
                        </div>
                    </TrackDurationText>
                </TrackDuration>
            </TrackWrapper>
        </SkeletonWrapper>
    );
};

Track.displayName = "Track";
Track.Skeleton = TrackSkeleton;
