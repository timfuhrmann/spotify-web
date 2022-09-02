import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { formatNumber } from "@lib/format";
import { getTotalSongsString } from "@lib/util";
import { Bullet } from "../../shared/Bullet";

const HeadUser = styled.span`
    ${text("textSm", "bold")};
`;

const HeadFollowers = styled.span``;

const HeadSongs = styled.span``;

interface PlaylistHeadFooterProps
    extends Pick<SpotifyApi.PlaylistObjectFull, "owner" | "followers"> {
    totalTracks: number;
}

export const PlaylistHeadFooter: React.FC<PlaylistHeadFooterProps> = ({
    owner,
    followers,
    totalTracks,
}) => {
    return (
        <React.Fragment>
            <HeadUser>{owner.display_name}</HeadUser>
            {followers.total > 0 && (
                <React.Fragment>
                    <Bullet />
                    <HeadFollowers>{formatNumber(followers.total)} likes</HeadFollowers>
                </React.Fragment>
            )}
            <Bullet />
            <HeadSongs>{getTotalSongsString(totalTracks)}</HeadSongs>
        </React.Fragment>
    );
};
