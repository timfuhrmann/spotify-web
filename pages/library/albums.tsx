import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import { useSavedAlbumsQuery } from "@lib/api/album/hook/useSavedAlbumsQuery";
import { useMemo } from "react";
import { EntryProps } from "../../src/components/shared/Entry";

const AlbumsWrapper = styled.div`
    padding-bottom: 2.4rem;
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
