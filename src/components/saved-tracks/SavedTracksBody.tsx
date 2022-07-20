import React from "react";
import { ListControls } from "../shared/ListControls/ListControls";
import styled from "styled-components";
import { SavedTracksList } from "./SavedTracksList";

const BodyWrapper = styled.div`
    position: relative;
    padding: 2.4rem 0;
    background-color: ${p => p.theme.gray50};
    isolation: isolate;

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 25rem;
        background-color: var(--dominant-color, ${p => p.theme.gray50});
        background-image: linear-gradient(rgba(0, 0, 0, 0.7) 0%, ${p => p.theme.gray50} 100%);
    }
`;

export const SavedTracksBody: React.FC = () => {
    return (
        <BodyWrapper>
            <ListControls hideFollow />
            <SavedTracksList />
        </BodyWrapper>
    );
};
