import styled from "styled-components";

export const TrackGrid = styled.div`
    display: grid;
    padding: 0 1.6rem;
    grid-gap: 1.8rem;
    height: ${p => p.theme.sizes.playlistTrackHeight};
`;
