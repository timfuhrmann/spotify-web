import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";
import { useSearch } from "@lib/context/search";
import { SearchProvider } from "@lib/context/search/SearchProvider";

const PlaylistsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Playlists: NextPageWithLayout = () => {
    const { playlists } = useSearch();

    return (
        <PlaylistsWrapper>
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
            <SearchProvider>
                <HeaderSpacer />
                <SearchNavigation />
                {page}
            </SearchProvider>
        </PrimaryLayout>
    );
};

export default Playlists;
