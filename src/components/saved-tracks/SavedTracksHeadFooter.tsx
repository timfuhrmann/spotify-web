import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { useSession } from "@lib/context/session";
import { useSavedTracks } from "./SavedTracksProvider";

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
                    <HeadUser>{session.display_name}</HeadUser> &#183;{" "}
                </React.Fragment>
            )}
            <HeadSongs>{total} songs</HeadSongs>
        </React.Fragment>
    );
};
