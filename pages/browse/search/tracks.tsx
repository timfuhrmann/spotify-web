import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { SearchProvider } from "@lib/context/search/SearchProvider";
import { useSearch } from "@lib/context/search";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";

const TracksWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Tracks: NextPageWithLayout = () => {
    const { tracks } = useSearch();

    return <TracksWrapper></TracksWrapper>;
};

// eslint-disable-next-line react/display-name
Tracks.getLayout = page => {
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

export default Tracks;
