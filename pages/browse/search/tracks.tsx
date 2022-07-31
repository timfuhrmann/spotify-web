import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { HeaderSpacer } from "../../../src/components/layout/HeaderSpacer";
import { SearchNavigation } from "../../../src/components/search/search-navigation/SearchNavigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

const TracksWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Tracks: NextPageWithLayout = () => {
    const tracks = useSelector((state: RootState) => state.search.tracks);

    return <TracksWrapper></TracksWrapper>;
};

// eslint-disable-next-line react/display-name
Tracks.getLayout = page => {
    return (
        <PrimaryLayout hasSearch>
            <HeaderSpacer />
            <SearchNavigation />
            {page}
        </PrimaryLayout>
    );
};

export default Tracks;
