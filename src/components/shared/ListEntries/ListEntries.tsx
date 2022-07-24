import React from "react";
import styled from "styled-components";
import { ListEntriesItem, ListEntriesItemProps } from "./ListEntriesItem";
import { text } from "@css/helper/typography";

const AlbumsWrapper = styled.div``;

const AlbumsHeadline = styled.h2`
    ${text("displayXs", "bold")};
    margin-bottom: 2.4rem;
`;

const AlbumsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
    grid-gap: 0 2.4rem;
    overflow-y: hidden;
`;

export type EntryType = "album" | "playlist" | "artist";

interface ListEntriesProps {
    headline: string;
    entries: ListEntriesItemProps[];
    type: EntryType;
}

export const ListEntries: React.FC<ListEntriesProps> = ({ headline, entries, type }) => {
    return (
        <AlbumsWrapper>
            <AlbumsHeadline>{headline}</AlbumsHeadline>
            <AlbumsGrid>
                {entries.slice(0, 7).map(album => (
                    <ListEntriesItem key={album.id} {...album} type={type} />
                ))}
            </AlbumsGrid>
        </AlbumsWrapper>
    );
};
