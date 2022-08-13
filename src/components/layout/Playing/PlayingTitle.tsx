import React from "react";
import styled from "styled-components";
import { SpotifyImage } from "@lib/image";
import { hover, square } from "@css/helper";
import { text } from "@css/helper/typography";
import { idFromUri } from "@lib/util";
import { usePlaying } from "./PlayingProvider";
import { FollowHeart } from "@icon/FollowHeart";
import { UnfollowHeart } from "@icon/UnfollowHeart";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";
import { Link } from "@lib/link";

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    height: 100%;
    min-width: 0;
`;

const TitleCover = styled.div`
    position: relative;
    ${square("5.6rem")};
`;

const TitleBody = styled.div`
    flex: 1 1 0;
    display: flex;
    align-items: center;
    gap: 3.2rem;
    min-width: 0;
`;

const TitleGroup = styled.div`
    min-width: 0;
`;

const TitleName = styled.div`
    ${text("textSm", "regular")};
    margin-bottom: 0.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const TitleArtists = styled.div`
    ${text("textXs", "regular")};
    line-height: 1.1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const TitleArtist = styled.a`
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
        text-decoration: underline;
    `};
`;

const ControlsButton = styled.button`
    display: inline-flex;
    margin: auto 0;
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

const ControlsFollow = styled(FollowHeart)`
    width: 1.6rem;
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

const ControlsUnfollow = styled(UnfollowHeart)`
    width: 1.6rem;
    color: ${p => p.theme.primary200};

    ${p => hover`
        color: ${p.theme.primary100};
    `};
`;

export const PlayingTitle: React.FC = () => {
    const { isSaved, onLikeTrack, onUnlikeTrack } = usePlaying();
    const { currentTrack } = useCurrentTrackSelector();

    return (
        <TitleWrapper>
            {currentTrack && (
                <React.Fragment>
                    <TitleCover>
                        <SpotifyImage images={currentTrack.album.images} alt={currentTrack.name} />
                    </TitleCover>
                    <TitleBody>
                        <TitleGroup>
                            <TitleName>{currentTrack.name}</TitleName>
                            <TitleArtists>
                                {currentTrack.artists.map(({ uri, name }, index) => (
                                    <React.Fragment key={uri}>
                                        <Link
                                            href={"/artist/" + idFromUri(uri)}
                                            label={name}
                                            prefetch={false}>
                                            <TitleArtist>{name}</TitleArtist>
                                        </Link>
                                        {index < currentTrack.artists.length - 1 && ", "}
                                    </React.Fragment>
                                ))}
                            </TitleArtists>
                        </TitleGroup>
                        {isSaved ? (
                            <ControlsButton
                                type="button"
                                aria-label="Remove from saved tracks"
                                title="Remove from saved tracks"
                                onClick={onUnlikeTrack}>
                                <ControlsUnfollow />
                            </ControlsButton>
                        ) : (
                            <ControlsButton
                                type="button"
                                aria-label="Add to saved tracks"
                                title="Add to saved tracks"
                                onClick={onLikeTrack}>
                                <ControlsFollow />
                            </ControlsButton>
                        )}
                    </TitleBody>
                </React.Fragment>
            )}
        </TitleWrapper>
    );
};
