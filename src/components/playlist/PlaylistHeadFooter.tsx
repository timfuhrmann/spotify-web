import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { formatNumber } from "@lib/format";
import { getTotalSongsString } from "@lib/util";

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
            <HeadUser>{owner.display_name}</HeadUser> &#183;{" "}
            <HeadFollowers>{formatNumber(followers.total)} likes</HeadFollowers> &#183;{" "}
            <HeadSongs>{getTotalSongsString(totalTracks)}</HeadSongs>
        </React.Fragment>
    );
};
