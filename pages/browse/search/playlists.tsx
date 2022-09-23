import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/SearchNavigation/SearchNavigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { Meta } from "@lib/meta";
import React from "react";

const PlaylistsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Playlists: NextPageWithLayout = () => {
    const playlists = useSelector((state: RootState) => state.search.playlists);

    return (
        <PlaylistsWrapper>
            <Meta title="Browse Playlists" />
            <GridEntries
                type="playlist"
                headline="Playlists"
                entries={playlists ? playlists.items : null}
            />
        </PlaylistsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Playlists.getLayout = page => {
    return (
        <PrimaryLayout hasSearch>
            <HeaderSpacer />
            <SearchNavigation />
            {page}
        </PrimaryLayout>
    );
};

export default Playlists;
