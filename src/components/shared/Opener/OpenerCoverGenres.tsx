import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { fillParent } from "@css/helper";

const GenresWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 6rem;
    padding-right: 6rem;
`;

const GenreTag = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0 2rem;
    height: 4rem;
    max-width: 20rem;
    border-radius: 3rem;
    overflow: hidden;

    &::after {
        content: "";
        ${fillParent};
        z-index: -1;
        background-color: ${p => p.theme.gray100};
        opacity: 0.5;
    }
`;

const GenreText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;
    ${text("textXl")};
`;

interface OpenerCoverGenresProps {
    genres: string[];
}

export const OpenerCoverGenres: React.FC<OpenerCoverGenresProps> = ({ genres }) => {
    return (
        <GenresWrapper>
            <GenreTag>
                <GenreText>{genres[0]}</GenreText>
            </GenreTag>
        </GenresWrapper>
    );
};
