import React from "react";
import styled from "styled-components";
import { Entry, EntryProps } from "./Entry";
import { text } from "@css/helper/typography";
import { SecondaryButton } from "./SecondaryButton";
import { createArray } from "@lib/util";

const EntriesWrapper = styled.div``;

const EntriesHead = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
`;

const EntiresHeadline = styled.h2`
    ${text("displayXs", "bold")};
`;

const EntriesLink = styled.div`
    margin-left: auto;
`;

const EntriesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
    grid-gap: 0 2.4rem;
    overflow-y: hidden;
`;

export type EntryType = "album" | "playlist" | "artist";

interface ListEntriesProps {
    entries: EntryProps[] | null;
    type: EntryType;
    headline?: string;
    link?: string | URL;
}

export const ListEntries: React.FC<ListEntriesProps> = ({ headline, entries, type, link }) => {
    return (
        <EntriesWrapper>
            {(headline || link) && (
                <EntriesHead>
                    {headline && <EntiresHeadline>{headline}</EntiresHeadline>}
                    {link && (
                        <EntriesLink>
                            <SecondaryButton as="a" action={link} label="See more" />
                        </EntriesLink>
                    )}
                </EntriesHead>
            )}
            <EntriesGrid>
                {entries
                    ? entries
                          .slice(0, 7)
                          .map(entry => <Entry key={entry.id} {...entry} type={type} />)
                    : createArray(7).map(index => <Entry.Skeleton key={index} type={type} />)}
            </EntriesGrid>
        </EntriesWrapper>
    );
};
