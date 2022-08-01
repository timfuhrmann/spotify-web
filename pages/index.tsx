import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../src/components/layout/PrimaryLayout";
import { useFeaturedPlaylistsQuery } from "@lib/api/playlist/hook/useFeaturedPlaylistsQuery";
import { ListEntries } from "../src/components/shared/ListEntries/ListEntries";
import { HeaderSpacer } from "../src/components/layout/HeaderSpacer";
import { content } from "@css/helper/content";
import { useNewReleasesQuery } from "@lib/api/album/hook/useNewReleasesQuery";
import { RecentlyPlayed } from "../src/components/recently-played/RecentlyPlayed";
import { text } from "@css/helper/typography";
import { transition } from "@css/helper";

const HomeWrapper = styled.div`
    ${content()};
    padding: 2.4rem 0;
`;

const HomeBackground = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 35rem;
    background-color: var(--dominant-color, ${p => p.theme.gray600});
    background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0%, ${p => p.theme.gray50} 100%);
    ${transition("background-color", "0.5s")};
`;

const HomeHeadline = styled.h1`
    ${text("displayMd", "bold")}
    margin-bottom: 4.2rem;
`;

const HomeGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4.2rem;
`;

const Home: NextPageWithLayout = () => {
    const { data: featuredPlaylists } = useFeaturedPlaylistsQuery(7);
    const { data: newReleases } = useNewReleasesQuery(7);

    return (
        <HomeWrapper>
            <HeaderSpacer />
            <HomeBackground />
            <HomeHeadline>Yo, what&apos;s up</HomeHeadline>
            <HomeGrid>
                <RecentlyPlayed />
                <ListEntries
                    headline={featuredPlaylists ? featuredPlaylists.message : null}
                    entries={featuredPlaylists ? featuredPlaylists.playlists.items : null}
                    type="playlist"
                />
                <ListEntries
                    headline={newReleases ? "Just released" : null}
                    entries={newReleases ? newReleases.albums.items : null}
                    type="album"
                />
            </HomeGrid>
        </HomeWrapper>
    );
};

// eslint-disable-next-line react/display-name
Home.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
