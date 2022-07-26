import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";
import { text } from "@css/helper/typography";
import { ArtistDiscographyTag } from "./ArtistDiscographyTag";
import { createArray } from "@lib/util";
import { SecondaryButton } from "../shared/SecondaryButton";

const DiscographyWrapper = styled.div`
    ${content()};
`;

const DiscographyHead = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2.4rem;
    margin-bottom: 2.4rem;
`;

const DiscographyHeadline = styled.h2`
    ${text("displayXs", "bold")};
`;

const DiscographyTags = styled.div`
    display: flex;
    gap: 0.6rem 1.2rem;
    flex-wrap: wrap;
    margin-bottom: 2.4rem;
`;

interface ArtistDiscographyProps {
    id: string;
}

export const ArtistDiscography: React.FC<ArtistDiscographyProps> = ({ id }) => {
    const { albumGroups, albums, albumGroup, setAlbumGroup } = useArtist();

    return (
        <DiscographyWrapper>
            <DiscographyHead>
                <DiscographyHeadline>Discography</DiscographyHeadline>
                <SecondaryButton
                    as="a"
                    action={`/artist/${id}/discography${albumGroup ? `/${albumGroup}` : ""}`}
                    label="See More"
                />
            </DiscographyHead>
            <DiscographyTags>
                <ArtistDiscographyTag
                    label="Popular releases"
                    selected={albumGroup === null}
                    onClick={() => setAlbumGroup(null)}
                />
                {albumGroups
                    ? albumGroups.map(group => (
                          <ArtistDiscographyTag
                              key={group}
                              label={group}
                              selected={albumGroup === group}
                              onClick={() => setAlbumGroup(group)}
                          />
                      ))
                    : createArray(3).map(index => <ArtistDiscographyTag.Skeleton key={index} />)}
            </DiscographyTags>
            <ListEntries entries={albums} type="album" />
        </DiscographyWrapper>
    );
};
