import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import { useFollowedArtistsQuery } from "@lib/api/artist/query/useFollowedArtistsQuery";

const ArtistsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Artists: NextPageWithLayout = () => {
    const { data: followedArtists } = useFollowedArtistsQuery();

    return (
        <ArtistsWrapper>
            <HeaderSpacer />
            <GridEntries
                headline="Artists"
                entries={followedArtists ? followedArtists.artists.items : null}
                type="artist"
            />
        </ArtistsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Artists.getLayout = page => {
    return <PrimaryLayout hasLibraryNavigation>{page}</PrimaryLayout>;
};

export default Artists;
