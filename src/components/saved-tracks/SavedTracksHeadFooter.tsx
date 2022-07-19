import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { useSession } from "@lib/context/session";

const HeadUser = styled.span`
    ${text("textSm", "bold")};
`;

const HeadSongs = styled.span``;

export const SavedTracksHeadFooter: React.FC = () => {
    const { session } = useSession();

    return (
        <React.Fragment>
            {session && (
                <React.Fragment>
                    <HeadUser>{session.display_name}</HeadUser> &#183;{" "}
                </React.Fragment>
            )}
            <HeadSongs>20 songs</HeadSongs>
        </React.Fragment>
    );
};
