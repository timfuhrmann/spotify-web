import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";
import { AlbumGroup } from "@lib/api/album";

const SingleWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Single: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistSingles } = useArtistsAlbumsQuery(getIdFromQuery(query), [
        AlbumGroup.Single,
    ]);

    return (
        <SingleWrapper>
            <HeaderSpacer />
            <GridEntries entries={artistSingles ? artistSingles.items : null} type="album" />
        </SingleWrapper>
    );
};

// eslint-disable-next-line react/display-name
Single.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Single;
