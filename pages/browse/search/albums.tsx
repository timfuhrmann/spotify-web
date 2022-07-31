import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { GridEntries } from "../../../src/components/shared/GridEntries";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

const AlbumsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Albums: NextPageWithLayout = () => {
    const albums = useSelector((state: RootState) => state.search.albums);

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
            <HeaderSpacer />
            <SearchNavigation />
            {page}
        </PrimaryLayout>
    );
};

export default Albums;
