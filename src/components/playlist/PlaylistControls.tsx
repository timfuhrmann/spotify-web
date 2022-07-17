import React from "react";
import styled from "styled-components";
import { PlayButton } from "../shared/PlayButton";
import { usePlaylist } from "./PlaylistProvider";
import { FollowHeart } from "@icon/FollowHeart";
import { UnfollowHeart } from "@icon/UnfollowHeart";
import { useSession } from "@lib/context/session";
import { hover } from "@css/helper";

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

export const PlaylistControls: React.FC<Pick<SpotifyApi.PlaylistObjectFull, "owner">> = ({
    owner,
}) => {
    const { session } = useSession();
    const { isFollowing, handleFollowPlaylist, handleUnfollowPlaylist } = usePlaylist();

    return (
        <ControlsWrapper>
            <PlayButton />
            {session && session.id !== owner.id && (
                <ControlsButton
                    type="button"
                    aria-label={isFollowing ? "Unfollow" : "Follow"}
                    onClick={isFollowing ? handleUnfollowPlaylist : handleFollowPlaylist}>
                    {isFollowing ? <ControlsUnfollow /> : <ControlsFollow />}
                </ControlsButton>
            )}
        </ControlsWrapper>
    );
};
