import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";

const DiscographyWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Discography: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistAlbums } = useArtistsAlbumsQuery(getIdFromQuery(query));

    return (
        <DiscographyWrapper>
            <HeaderSpacer />
            <GridEntries entries={artistAlbums ? artistAlbums.items : null} type="album" />
        </DiscographyWrapper>
    );
};

// eslint-disable-next-line react/display-name
Discography.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Discography;
