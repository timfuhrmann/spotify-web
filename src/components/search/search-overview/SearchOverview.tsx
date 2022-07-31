import React from "react";
import styled from "styled-components";
import { SearchOverviewProvider } from "./SearchOverviewProvider";
import { SearchOverviewTopResult } from "./SearchOverviewTopResult";
import { content } from "@css/helper/content";
import { SearchOverviewTracks } from "./SearchOverviewTracks";
import { ListEntries } from "../../shared/ListEntries/ListEntries";
import { text } from "@css/helper/typography";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

const OverviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4.2rem;
    ${content()};
`;

const OverviewHead = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 2.4rem;
`;

const OverviewTopResult = styled.div`
    grid-column: 1 / 3;
`;

const OverviewTracks = styled.div`
    grid-column: 3 / 8;
`;

const OverviewHeadline = styled.div`
    margin-bottom: 2.4rem;
    ${text("displayXs", "bold")};
`;

export const SearchOverview: React.FC = () => {
    const { topArtist, loading, tracks, artists, albums, playlists } = useSelector(
        (state: RootState) => state.search
    );

    return (
        <SearchOverviewProvider>
            <OverviewWrapper>
                {(loading || topArtist || tracks) && (
                    <OverviewHead>
                        {(loading || topArtist) && (
                            <OverviewTopResult>
                                <OverviewHeadline>Top result</OverviewHeadline>
                                {topArtist ? (
                                    <SearchOverviewTopResult
                                        id={topArtist.id}
                                        name={topArtist.name}
                                        images={topArtist.images}
                                    />
                                ) : (
                                    <SearchOverviewTopResult.Skeleton />
                                )}
                            </OverviewTopResult>
                        )}
                        {(loading || tracks) && (
                            <OverviewTracks>
                                <OverviewHeadline>Songs</OverviewHeadline>
                                <SearchOverviewTracks />
                            </OverviewTracks>
                        )}
                    </OverviewHead>
                )}
                {(loading || playlists) && (
                    <ListEntries
                        type="playlist"
                        headline="Playlists"
                        entries={playlists ? playlists.items : null}
                    />
                )}
                {(loading || artists) && (
                    <ListEntries
                        type="artist"
                        headline="Artists"
                        entries={artists ? artists.items : null}
                    />
                )}
                {(loading || albums) && (
                    <ListEntries
                        type="album"
                        headline="Albums"
                        entries={albums ? albums.items : null}
                    />
                )}
            </OverviewWrapper>
        </SearchOverviewProvider>
    );
};
