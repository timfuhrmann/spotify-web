import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { hover, transition } from "@css/helper";
import { SkeletonWrapper } from "@lib/skeleton/wrapper";

const TagWrapper = styled.button<{ $selected?: boolean }>`
    display: inline-flex;
    align-items: center;
    height: 3.2rem;
    padding: 0 1.2rem;
    border-radius: 3rem;
    color: ${p => (p.$selected ? p.theme.gray50 : p.theme.gray900)};
    background-color: ${p => (p.$selected ? p.theme.gray900 : p.theme.gray75)};
    ${text("textSm")};
    line-height: 1;
    text-transform: capitalize;
    ${transition("background-color", "0.1s")};

    ${p => hover`
        background-color: ${!p.$selected && p.theme.gray100};
    `};
`;

interface ParentComposition {
    Skeleton: typeof ListEntriesTagSkeleton;
}

interface ListEntriesTagProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export const ListEntriesTag: React.FC<ListEntriesTagProps> & ParentComposition = ({
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

const ListEntriesTagSkeleton: React.FC = () => {
    return (
        <SkeletonWrapper>
            <TagWrapper style={{ width: "70px" }} />
        </SkeletonWrapper>
    );
};

ListEntriesTag.Skeleton = ListEntriesTagSkeleton;
