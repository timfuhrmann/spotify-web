import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { useArtist } from "./ArtistProvider";
import { content } from "@css/helper/content";
import { text } from "@css/helper/typography";
import { hover, transition } from "@css/helper";
import { ArtistDiscographyTag } from "./ArtistDiscographyTag";

const DiscographyWrapper = styled.div`
    ${content()};
`;

const DiscographyHeadline = styled.h2`
    ${text("displayXs", "bold")};
    margin-bottom: 2.4rem;
`;

const DiscographyTags = styled.div`
    display: flex;
    gap: 0.6rem 1.2rem;
    flex-wrap: wrap;
    margin-bottom: 2.4rem;
`;

export const ArtistDiscography: React.FC = () => {
    const { albumGroups, albums, albumGroup, setAlbumGroup } = useArtist();

    return (
        <DiscographyWrapper>
            <DiscographyHeadline>Discography</DiscographyHeadline>
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
                    : Array.from(Array(3).keys()).map(index => (
                          <ArtistDiscographyTag.Skeleton key={index} />
                      ))}
            </DiscographyTags>
            <ListEntries entries={albums} type="album" />
        </DiscographyWrapper>
    );
};
