import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { useSession } from "@lib/context/session";
import { useSavedTracks } from "./SavedTracksProvider";
import { getTotalSongsString } from "@lib/util";
import { Bullet } from "../../shared/Bullet";

const HeadUser = styled.span`
    ${text("textSm", "bold")};
`;

const HeadSongs = styled.span``;

export const SavedTracksHeadFooter: React.FC = () => {
    const { session } = useSession();
    const { total } = useSavedTracks();

    return (
        <React.Fragment>
            {session && (
                <React.Fragment>
                    <HeadUser>{session.display_name}</HeadUser>
                    <Bullet />
                </React.Fragment>
            )}
            <HeadSongs>{getTotalSongsString(total)}</HeadSongs>
        </React.Fragment>
    );
};
