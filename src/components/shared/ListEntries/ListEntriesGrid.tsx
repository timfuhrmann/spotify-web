import React from "react";
import styled from "styled-components";
import { Entry, EntryType } from "../Entry";
import { createArray } from "@lib/util";
import { useListEntries } from "./ListEntriesProvider";

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
    grid-gap: 0 2.4rem;
    overflow-y: hidden;
`;

interface ListEntriesGridProps {
    type: EntryType;
}

export const ListEntriesGrid: React.FC<ListEntriesGridProps> = ({ type }) => {
    const { entries } = useListEntries();

    return (
        <GridWrapper>
            {entries
                ? entries.slice(0, 7).map(entry => <Entry key={entry.id} {...entry} type={type} />)
                : createArray(7).map(index => <Entry.Skeleton key={index} type={type} />)}
        </GridWrapper>
    );
};
