import React from "react";
import styled from "styled-components";
import { EntryProps, EntryType } from "../Entry";
import { ListEntriesProvider } from "./ListEntriesProvider";
import { ListEntriesGrid } from "./ListEntriesGrid";
import { ListEntriesHead } from "./ListEntriesHead";

const EntriesWrapper = styled.section`
    width: 100%;
`;

export interface ListEntriesProps {
    type: EntryType;
    headline: string | null | undefined;
    entries: Record<string, EntryProps[]> | EntryProps[] | null;
    link?: string | ((tag: string | null) => string);
    defaultTag?: string;
    hasTags?: boolean;
}

export const ListEntries: React.FC<ListEntriesProps> = ({
    headline,
    link,
    type,
    defaultTag,
    hasTags,
    ...props
}) => {
    return (
        <ListEntriesProvider {...props}>
            <EntriesWrapper>
                <ListEntriesHead
                    headline={headline}
                    link={link}
                    defaultTag={defaultTag}
                    hasTags={hasTags}
                />
                <ListEntriesGrid type={type} />
            </EntriesWrapper>
        </ListEntriesProvider>
    );
};
