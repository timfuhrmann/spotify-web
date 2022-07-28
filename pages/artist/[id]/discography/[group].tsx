import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ALBUM_GROUPS, AlbumGroup, isAlbumGroup } from "@lib/api/artist";

const DiscographyWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Discography: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { group } = query;

    const { data: artistAlbums } = useArtistsAlbumsQuery(
        getIdFromQuery(query),
        group && typeof group === "string" && isAlbumGroup(group) ? [group] : undefined
    );

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
