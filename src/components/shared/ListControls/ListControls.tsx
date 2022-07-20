import React from "react";
import { PlayButton } from "../PlayButton";
import styled from "styled-components";
import { FollowHeart } from "@icon/FollowHeart";
import { hover } from "@css/helper";
import { UnfollowHeart } from "@icon/UnfollowHeart";
import { useSession } from "@lib/context/session";

const ControlsWrapper = styled.div`
    display: flex;
    gap: 3.2rem;
    padding: 0 3.2rem 2.4rem;
`;

const ControlsButton = styled.button``;

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

interface ListControlsProps {
    owner?: SpotifyApi.UserObjectPublic | null;
    isFollowing?: boolean;
    onFollow?: () => void;
    onUnfollow?: () => void;
    hideFollow?: boolean;
}

export const ListControls: React.FC<ListControlsProps> = ({
    owner,
    isFollowing,
    onFollow,
    onUnfollow,
    hideFollow,
}) => {
    const { session } = useSession();

    return (
        <ControlsWrapper>
            <PlayButton />
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
