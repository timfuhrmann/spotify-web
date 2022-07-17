import React from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";
import { CoverImage } from "../shared/CoverImage";

const HeadWrapper = styled.div`
    position: relative;
    min-height: max(34rem, 40vh);
`;

const HeadBackground = styled.div`
    ${fillParent};
    z-index: -1;
    overflow: hidden;
`;

const HeadOverlay = styled.div`
    ${fillParent};
    opacity: min(1, var(--scroll, 0) / 200);
    background-color: var(--dominant-color, ${p => p.theme.gray50});
`;

const HeadImage = styled.div`
    ${fillParent};
    transform: scale(max(1, 1.1 - var(--scroll, 0) / 2000));
`;

export const ArtistHead: React.FC<Pick<SpotifyApi.ArtistObjectFull, "name" | "images">> = ({
    name,
    images,
}) => {
    return (
        <HeadWrapper>
            <HeadBackground>
                <HeadImage>
                    <CoverImage images={images} alt={name} />
                </HeadImage>
                <HeadOverlay />
            </HeadBackground>
        </HeadWrapper>
    );
};
