import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRootPlaylistsQuery } from "@lib/api/playlist/hook/useRootPlaylistsQuery";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";

const PlaylistsWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Playlists: NextPageWithLayout = () => {
    const { data: rootPlaylists } = useRootPlaylistsQuery();

    return (
        <PlaylistsWrapper>
            <HeaderSpacer />
            <GridEntries headline="Playlists" entries={rootPlaylists || null} type="playlist" />
        </PlaylistsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Playlists.getLayout = page => {
    return <PrimaryLayout hasLibraryNavigation>{page}</PrimaryLayout>;
};

export default Playlists;
