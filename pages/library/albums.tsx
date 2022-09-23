import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import { useSavedAlbumsQuery } from "@lib/api/album/query/useSavedAlbumsQuery";
import React, { useMemo } from "react";
import { EntryProps } from "../../src/components/shared/Entry";
import { Meta } from "@lib/meta";

const AlbumsWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Albums: NextPageWithLayout = () => {
    const { data: savedAlbums } = useSavedAlbumsQuery();

    const entries = useMemo<EntryProps[] | null>(() => {
        if (!savedAlbums) {
            return null;
        }

        return savedAlbums.items.map(item => item.album);
    }, [savedAlbums]);

    return (
        <AlbumsWrapper>
            <Meta title="Albums" />
            <HeaderSpacer />
            <GridEntries headline="Albums" entries={entries} type="album" />
        </AlbumsWrapper>
    );
};

// eslint-disable-next-line react/display-name
Albums.getLayout = page => {
    return <PrimaryLayout hasLibraryNavigation>{page}</PrimaryLayout>;
};

export default Albums;
