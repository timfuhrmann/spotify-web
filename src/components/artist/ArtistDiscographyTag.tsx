import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { hover, transition } from "@css/helper";
import { SkeletonWrapper } from "@lib/skeleton/wrapper";

const TagWrapper = styled.button<{ $selected?: boolean }>`
    height: 3.2rem;
    padding: 0 1.2rem;
    border-radius: 3rem;
    color: ${p => (p.$selected ? p.theme.gray50 : p.theme.gray900)};
    background-color: ${p => (p.$selected ? p.theme.gray900 : p.theme.gray75)};
    ${text("textSm")};
    text-transform: capitalize;
    ${transition("background-color", "0.1s")};

    ${p => hover`
        background-color: ${!p.$selected && p.theme.gray100};
    `};
`;

interface ParentComposition {
    Skeleton: typeof ArtistDiscographyTagSkeleton;
}

interface ArtistDiscographyTagProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export const ArtistDiscographyTag: React.FC<ArtistDiscographyTagProps> & ParentComposition = ({
    label,
    selected,
    onClick,
}) => {
    return (
        <TagWrapper type="button" aria-selected={selected} $selected={selected} onClick={onClick}>
            {label}
        </TagWrapper>
    );
};

const ArtistDiscographyTagSkeleton: React.FC = () => {
    return (
        <SkeletonWrapper>
            <TagWrapper style={{ width: "70px" }} />
        </SkeletonWrapper>
    );
};

ArtistDiscographyTag.Skeleton = ArtistDiscographyTagSkeleton;
