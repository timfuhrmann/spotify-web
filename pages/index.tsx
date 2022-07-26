import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../src/components/layout/PrimaryLayout";
import { useFeaturedPlaylistsQuery } from "@lib/api/hook/useFeaturedPlaylistsQuery";
import { ListEntries } from "../src/components/shared/ListEntries/ListEntries";
import { HeaderSpacer } from "../src/components/layout/HeaderSpacer";
import { content } from "@css/helper/content";
import { useNewReleasesQuery } from "@lib/api/hook/useNewReleasesQuery";

const HomeWrapper = styled.div`
    ${content()};
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
            <HomeGrid>
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
