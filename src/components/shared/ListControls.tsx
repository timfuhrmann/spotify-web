import React from "react";
import { PlayButton } from "./PlayButton";
import styled from "styled-components";
import { FollowHeart } from "@icon/FollowHeart";
import { hover, square } from "@css/helper";
import { UnfollowHeart } from "@icon/UnfollowHeart";
import { useSession } from "@lib/context/session";
import { content } from "@css/helper/content";

const ControlsWrapper = styled.div`
    display: flex;
    gap: 3.2rem;
    ${content()};
    padding-bottom: 2.4rem;
`;

const ControlsButton = styled.button`
    display: inline-flex;
    align-items: center;
`;

const ControlsFollow = styled(FollowHeart)`
    width: 3.2rem;
    color: ${p => p.theme.gray700};

    ${p => hover`
        color: ${p.theme.gray900};
    `};
`;

const ControlsUnfollow = styled(UnfollowHeart)`
    width: 3.2rem;
    color: ${p => p.theme.primary200};

    ${p => hover`
        color: ${p.theme.primary100};
    `};
`;

const ControlsPlay = styled.div`
    ${square("5.6rem")};
`;

interface ListControlsProps {
    onPlay: () => void;
    owner?: SpotifyApi.UserObjectPublic | null;
    isFollowing?: boolean;
    onFollow?: () => void;
    onUnfollow?: () => void;
    hideFollow?: boolean;
}

export const ListControls: React.FC<ListControlsProps> = ({
    owner,
    isFollowing,
    hideFollow,
    onPlay,
    onFollow,
    onUnfollow,
}) => {
    const { session } = useSession();

    return (
        <ControlsWrapper>
            <ControlsPlay>
                <PlayButton onClick={() => onPlay()} />
            </ControlsPlay>
            {(!owner || (session && session.id !== owner.id)) && !hideFollow && (
                <React.Fragment>
                    {isFollowing ? (
                        <ControlsButton
                            type="button"
                            aria-label="Unfollow"
                            title="Unfollow"
                            onClick={onUnfollow}>
                            <ControlsUnfollow />
                        </ControlsButton>
                    ) : (
                        <ControlsButton
                            type="button"
                            aria-label="Follow"
                            title="Follow"
                            onClick={onFollow}>
                            <ControlsFollow />
                        </ControlsButton>
                    )}
                </React.Fragment>
            )}
        </ControlsWrapper>
    );
};
