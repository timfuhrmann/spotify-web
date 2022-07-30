import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { SearchProvider } from "@lib/context/search/SearchProvider";
import { useSearch } from "@lib/context/search";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";

const ArtistsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Artists: NextPageWithLayout = () => {
    const { artists } = useSearch();

    return (
        <ArtistsWrapper>
            <GridEntries
                type="artist"
                headline="Artists"
                entries={artists ? artists.items : null}
            />
        </ArtistsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Artists.getLayout = page => {
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

export default Artists;
