import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/query/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";
import { AlbumGroup } from "@type/album";
import { Meta } from "@lib/meta";

const SingleWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Single: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistSingles } = useArtistsAlbumsQuery(getIdFromQuery(query), [
        AlbumGroup.Single,
    ]);

    return (
        <SingleWrapper>
            <Meta title="Singles" />
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
