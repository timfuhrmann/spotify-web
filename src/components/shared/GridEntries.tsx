import React from "react";
import styled from "styled-components";
import { Entry, EntryProps, EntryType } from "./Entry";
import { content } from "@css/helper/content";
import { SkeletonOverlay } from "@lib/skeleton/overlay";
import { createArray } from "@lib/util";
import { text } from "@css/helper/typography";

const EntriesWrapper = styled.div`
    ${content()};
`;

const EntriesHeadline = styled.h1`
    ${text("displayXs", "bold")};
    margin-bottom: 2.4rem;
`;

const EntriesGrid = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
    grid-gap: 2.4rem;
`;

interface GridEntriesProps {
    type: EntryType;
    entries: EntryProps[] | null;
    headline?: string | null;
}

export const GridEntries: React.FC<GridEntriesProps> = ({ headline, entries, type }) => {
    return (
        <EntriesWrapper>
            {headline && <EntriesHeadline>{headline}</EntriesHeadline>}
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
