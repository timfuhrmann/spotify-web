import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import { Meta } from "@lib/meta";
import React from "react";

const PlaylistsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Playlists: NextPageWithLayout = () => {
    const { data: rootPlaylists } = useRootPlaylistsQuery();

    return (
        <PlaylistsWrapper>
            <Meta title="Playlists" />
            <HeaderSpacer />
            <GridEntries
                headline="Playlists"
                entries={rootPlaylists ? rootPlaylists : null}
                type="playlist"
            />
        </PlaylistsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Playlists.getLayout = page => {
    return <PrimaryLayout hasLibraryNavigation>{page}</PrimaryLayout>;
};

export default Playlists;
