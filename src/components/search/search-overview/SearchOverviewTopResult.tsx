import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { fillParent, hover, square, transition } from "@css/helper";
import { SpotifyImage } from "@lib/image";
import { PlayButton } from "../../shared/PlayButton";
import { Link } from "@lib/link";
import { Skeleton } from "@lib/skeleton";

const ResultPlay = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 2.4rem;
    right: 2.4rem;
    ${square("4.8rem")};
    transform: translate3d(0, 0.8rem, 0);
    opacity: 0;
    ${transition("transform, opacity", "0.2s")};

    @media (hover: none) {
        opacity: 1;
        transform: none;
    }
`;

const ResultFrame = styled.div`
    position: relative;
    padding: 2.4rem;
    background-color: ${p => p.theme.gray75};
    border-radius: 0.4rem;
    ${transition("background-color", "0.1s")};

    ${p => hover`
        background-color: ${p.theme.gray100};
      
        ${ResultPlay} {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    `};
`;

const ResultImage = styled.div`
    position: relative;
    ${square("9.2rem")};
    margin-bottom: 2.4rem;
    border-radius: 50%;
    background-color: ${p => p.theme.gray100};
    overflow: hidden;
    transform: translateZ(0);
`;

const ResultName = styled.div`
    ${text("displayMd", "bold")};
    margin-bottom: 1.2rem;
`;

const ResultTag = styled.div`
    display: inline-flex;
    align-items: center;
    height: 3rem;
    padding: 0 1rem;
    border-radius: 1.5rem;
    background-color: ${p => p.theme.gray50};
    ${text("textXs", "bold")};
    line-height: 1;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
`;

const ResultAnchor = styled.a`
    ${fillParent};
`;

interface ParentComposition {
    Skeleton: typeof SearchOverviewTopResultSkeleton;
}

export interface SearchOverviewTopResultProps {
    id: string;
    name: string;
    images: SpotifyApi.ImageObject[];
}

export const SearchOverviewTopResult: React.FC<SearchOverviewTopResultProps> &
    ParentComposition = ({ id, name, images }) => {
    return (
        <ResultFrame>
            <ResultImage>
                <SpotifyImage images={images} alt={name} sizes="92px" />
            </ResultImage>
            <ResultName>{name}</ResultName>
            <ResultTag>Artist</ResultTag>
            <ResultPlay>
                <PlayButton />
            </ResultPlay>
            <Link label={name} href={"/artist/" + id}>
                <ResultAnchor />
            </Link>
        </ResultFrame>
    );
};

const SearchOverviewTopResultSkeleton: React.FC = () => {
    return (
        <ResultFrame>
            <ResultImage />
            <ResultName>
                <Skeleton />
            </ResultName>
            <ResultTag style={{ width: "70px" }}>&zwnj;</ResultTag>
        </ResultFrame>
    );
};

SearchOverviewTopResult.Skeleton = SearchOverviewTopResultSkeleton;
