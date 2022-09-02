import React from "react";
import styled from "styled-components";
import { Entry, EntryType } from "../Entry";
import { createArray } from "@lib/util";
import { useListEntries } from "./ListEntriesProvider";
import { breakpoints } from "@css/helper/breakpoints";

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
    overflow-y: hidden;
    grid-gap: 0 1.2rem;

    ${breakpoints().min("l")} {
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0 2.4rem;
    }

    ${breakpoints().min("xl")} {
        grid-template-columns: repeat(6, 1fr);
    }

    ${breakpoints().min("xxl")} {
        grid-template-columns: repeat(7, 1fr);
    }
`;

interface ListEntriesGridProps {
    type: EntryType;
}

export const ListEntriesGrid: React.FC<ListEntriesGridProps> = ({ type }) => {
    const { entries } = useListEntries();

    return (
        <GridWrapper aria-busy={!entries}>
            {entries
                ? entries
                      .slice(0, 7)
                      .map(entry => entry && <Entry key={entry.id} {...entry} type={type} />)
                : createArray(7).map(index => <Entry.Skeleton key={index} type={type} />)}
        </GridWrapper>
    );
};
