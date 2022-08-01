import React, { NamedExoticComponent } from "react";
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

const TrackPlay = styled(Play)`
    display: none;
    width: 1.6rem;
`;

const TrackNumber = styled.span``;

const TrackButton = styled.button`
    display: flex;
`;

const TrackWrapper = styled(TrackGrid)`
    border-radius: 0.4rem;
    color: ${p => p.theme.gray700};
    ${text("textSm")};

    ${p => hover`
        color: ${p.theme.gray900};
        background-color: ${p.theme.gray100};
      
        ${TrackPlay},
        ${TrackButton} {
            display: flex;
        }

        ${TrackNumber} {
            display: none;
        }
    `};

    &:focus {
        color: ${p => p.theme.gray900};
        background-color: ${p => p.theme.gray400};

        ${TrackPlay},
        ${TrackButton} {
            display: flex;
        }

        ${TrackNumber} {
            display: none;
        }
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

interface ParentComposition {
    Skeleton: typeof TrackSkeleton;
}

interface TrackProps {
    index: number;
    id: string;
    name: string;
    explicit: boolean;
    duration_ms: number;
    isSaved: boolean;
    images?: SpotifyApi.ImageObject[];
    artists?: SpotifyApi.ArtistObjectSimplified[];
    album?: SpotifyApi.AlbumObjectSimplified;
    addedAt?: string;
    onSaveTrack?: (id: string, index: number) => void;
    onRemoveTrack?: (id: string, index: number) => void;
}

//@ts-ignore
export const Track: NamedExoticComponent<TrackProps> & ParentComposition = React.memo(
    ({
        index,
        id,
        name,
        images,
        album,
        artists,
        explicit,
        duration_ms,
        isSaved,
        addedAt,
        onSaveTrack,
        onRemoveTrack,
    }) => {
        const buttonSaveLabel = isSaved ? "Remove from library" : "Add to library";

        return (
            <TrackWrapper role="row" aria-rowindex={index} tabIndex={1}>
                <TrackIndex>
                    <TrackNumber>{index + 1}</TrackNumber>
                    <TrackPlay />
                </TrackIndex>
                <TrackTitle name={name} images={images} artists={artists} explicit={explicit} />
                {album && <TrackAlbum {...album} />}
                {addedAt && <TrackTime>{dateToTimeString(addedAt)}</TrackTime>}
                <TrackDuration>
                    {isSaved ? (
                        <TrackButton
                            title={buttonSaveLabel}
                            aria-label={buttonSaveLabel}
                            onClick={() => onRemoveTrack && onRemoveTrack(id, index)}>
                            <TrackRemove />
                        </TrackButton>
                    ) : (
                        <TrackButton
                            title={buttonSaveLabel}
                            aria-label={buttonSaveLabel}
                            onClick={() => onSaveTrack && onSaveTrack(id, index)}>
                            <TrackSave />
                        </TrackButton>
                    )}
                    <TrackDurationText>{msToMinutesAndSeconds(duration_ms)}</TrackDurationText>
                </TrackDuration>
            </TrackWrapper>
        );
    }
);

interface TrackSkeletonProps {
    hideAlbum?: boolean;
    hideAlbumCover?: boolean;
    hideAddedAt?: boolean;
}

const TrackSkeleton: React.FC<TrackSkeletonProps> = ({
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

Track.Skeleton = TrackSkeleton;
Track.displayName = "Track";
