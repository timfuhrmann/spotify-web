import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/query/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";
import { Meta } from "@lib/meta";

const DiscographyWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Discography: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistAlbums } = useArtistsAlbumsQuery(getIdFromQuery(query));

    return (
        <DiscographyWrapper>
            <Meta title="Discography" />
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
