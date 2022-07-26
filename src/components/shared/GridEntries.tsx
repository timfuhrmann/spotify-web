import React from "react";
import styled from "styled-components";
import { Entry, EntryProps } from "./Entry";
import { content } from "@css/helper/content";
import { EntryType } from "./ListEntries";
import { SkeletonOverlay } from "@lib/skeleton/overlay";
import { createArray } from "@lib/util";

const EntriesWrapper = styled.div`
    ${content()};
`;

const EntriesGrid = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
    grid-gap: 2.4rem;
`;

interface GridEntriesProps {
    entries: EntryProps[] | null;
    type: EntryType;
}

export const GridEntries: React.FC<GridEntriesProps> = ({ entries, type }) => {
    return (
        <EntriesWrapper>
            <EntriesGrid>
                {entries ? (
                    entries.map(entry => <Entry key={entry.id} {...entry} />)
                ) : (
                    <React.Fragment>
                        <SkeletonOverlay />
                        {createArray(28).map(index => (
                            <Entry.Skeleton key={index} type={type} />
                        ))}
                    </React.Fragment>
                )}
            </EntriesGrid>
        </EntriesWrapper>
    );
};
