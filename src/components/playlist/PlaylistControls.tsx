import React from "react";
import styled from "styled-components";
import { PlayButton } from "../shared/PlayButton";
import { usePlaylist } from "./PlaylistProvider";
import { FollowHeart } from "@icon/FollowHeart";
import { UnfollowHeart } from "@icon/UnfollowHeart";

const ControlsWrapper = styled.div`
    display: flex;
    gap: 3.2rem;
    padding: 0 3.2rem 2.4rem;
`;

const ControlsFollow = styled.button<{ $active: boolean }>`
    color: ${p => (p.$active ? p.theme.primary200 : p.theme.gray700)};
`;

export const PlaylistControls: React.FC = () => {
    const { isFollowing, handleFollowPlaylist, handleUnfollowPlaylist } = usePlaylist();

    //@todo check if owner
    return (
        <ControlsWrapper>
            <PlayButton />
            <ControlsFollow
                type="button"
                aria-label={isFollowing ? "Unfollow" : "Follow"}
                $active={isFollowing}
                onClick={isFollowing ? handleUnfollowPlaylist : handleFollowPlaylist}>
                {isFollowing ? <UnfollowHeart width="32" /> : <FollowHeart width="32" />}
            </ControlsFollow>
        </ControlsWrapper>
    );
};
