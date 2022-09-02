import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/SearchNavigation/SearchNavigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

const ArtistsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Artists: NextPageWithLayout = () => {
    const artists = useSelector((state: RootState) => state.search.artists);

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
            <HeaderSpacer />
            <SearchNavigation />
            {page}
        </PrimaryLayout>
    );
};

export default Artists;
