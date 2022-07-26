import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { SecondaryButton } from "../SecondaryButton";
import { Skeleton } from "@lib/skeleton";
import { useListEntries } from "./ListEntriesProvider";
import { createArray } from "@lib/util";
import { ListEntriesTag } from "./ListEntriesTag";

const HeadWrapper = styled.div`
    margin-bottom: 2.4rem;
`;

const HeadRow = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2.4rem;
    margin-bottom: 2.4rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const HeadHeadline = styled.h2`
    ${text("displayXs", "bold")};
`;

const HeadLink = styled.div`
    margin-left: auto;
`;

const HeadTags = styled.div`
    display: flex;
    gap: 0.6rem 1.2rem;
    flex-wrap: wrap;
    margin-bottom: 2.4rem;
`;

interface ListEntriesHeadProps {
    headline: string | null | undefined;
    link?: string | ((tag: string | null) => string);
    defaultTag?: string;
    hasTags?: boolean;
}

export const ListEntriesHead: React.FC<ListEntriesHeadProps> = ({
    headline,
    link,
    defaultTag,
    hasTags,
}) => {
    const { tags, activeTag, setActiveTag } = useListEntries();

    return (
        <HeadWrapper>
            <HeadRow>
                {headline ? (
                    <HeadHeadline>{headline}</HeadHeadline>
                ) : (
                    <HeadHeadline>
                        <Skeleton />
                    </HeadHeadline>
                )}
                {link && (
                    <HeadLink>
                        <SecondaryButton
                            as="a"
                            action={typeof link === "string" ? link : link(activeTag)}
                            label="See more"
                        />
                    </HeadLink>
                )}
            </HeadRow>
            {hasTags && (
                <HeadTags>
                    {defaultTag && (
                        <ListEntriesTag
                            label={defaultTag}
                            selected={activeTag === null}
                            onClick={() => setActiveTag(null)}
                        />
                    )}
                    {tags
                        ? tags.map(group => (
                              <ListEntriesTag
                                  key={group}
                                  label={group}
                                  selected={activeTag === group}
                                  onClick={() => setActiveTag(group)}
                              />
                          ))
                        : createArray(3).map(index => <ListEntriesTag.Skeleton key={index} />)}
                </HeadTags>
            )}
        </HeadWrapper>
    );
};
