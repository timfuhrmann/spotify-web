import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";
import { AlbumGroup } from "@type/album";

const AlbumWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Album: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistAlbums } = useArtistsAlbumsQuery(getIdFromQuery(query), [AlbumGroup.Album]);

    return (
        <AlbumWrapper>
            <HeaderSpacer />
            <GridEntries entries={artistAlbums ? artistAlbums.items : null} type="album" />
        </AlbumWrapper>
    );
};

// eslint-disable-next-line react/display-name
Album.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Album;
