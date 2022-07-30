import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { useSearch } from "@lib/context/search";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";
import { SearchProvider } from "@lib/context/search/SearchProvider";

const AlbumsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Albums: NextPageWithLayout = () => {
    const { albums } = useSearch();

    return (
        <AlbumsWrapper>
            <GridEntries type="album" headline="Albums" entries={albums ? albums.items : null} />
        </AlbumsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Albums.getLayout = page => {
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

export default Albums;
