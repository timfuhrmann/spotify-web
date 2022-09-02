import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { SearchNavigation } from "../../../src/components/search/SearchNavigation/SearchNavigation";
import { SearchOverview } from "../../../src/components/search/SearchOverview/SearchOverview";

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
            <HeaderSpacer />
            <SearchNavigation />
            {page}
        </PrimaryLayout>
    );
};

export default Search;
