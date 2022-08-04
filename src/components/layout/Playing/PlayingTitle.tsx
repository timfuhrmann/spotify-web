import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { SpotifyImage } from "@lib/image";
import { square } from "@css/helper";
import { text } from "@css/helper/typography";

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    height: 100%;
`;

const TitleCover = styled.div`
    position: relative;
    ${square("5.6rem")};
`;

const TitleBody = styled.div``;

const TitleName = styled.div`
    ${text("textSm", "regular")};
`;

export const PlayingTitle: React.FC = () => {
    const currentTrack = useSelector((root: RootState) => root.player.currentTrack);

    return (
        <TitleWrapper>
            {currentTrack && (
                <React.Fragment>
                    <TitleCover>
                        <SpotifyImage images={currentTrack.album.images} alt={currentTrack.name} />
                    </TitleCover>
                    <TitleBody>
                        <TitleName>{currentTrack.name}</TitleName>
                    </TitleBody>
                </React.Fragment>
            )}
        </TitleWrapper>
    );
};
