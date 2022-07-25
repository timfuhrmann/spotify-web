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
    headline?: string;
    entries: ListEntriesItemProps[] | null;
    type: EntryType;
}

export const ListEntries: React.FC<ListEntriesProps> = ({ headline, entries, type }) => {
    return (
        <AlbumsWrapper>
            {headline && <AlbumsHeadline>{headline}</AlbumsHeadline>}
            <AlbumsGrid>
                {entries
                    ? entries
                          .slice(0, 7)
                          .map(entry => <ListEntriesItem key={entry.id} {...entry} type={type} />)
                    : Array.from(Array(10).keys()).map(index => (
                          <ListEntriesItem.Skeleton key={index} type={type} />
                      ))}
            </AlbumsGrid>
        </AlbumsWrapper>
    );
};
