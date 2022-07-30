import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { SearchProvider } from "@lib/context/search/SearchProvider";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";
import { SearchOverview } from "../../../src/components/search/search-overview/SearchOverview";

const SearchWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Search: NextPageWithLayout = () => {
    return (
        <SearchWrapper>
            <SearchOverview />
        </SearchWrapper>
    );
};

// eslint-disable-next-line react/display-name
Search.getLayout = page => {
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

export default Search;
