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

const AppearsOnWrapper = styled.div`
    padding: 2.4rem 0;
`;

const AppearsOn: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistAppearsOn } = useArtistsAlbumsQuery(getIdFromQuery(query), [
        AlbumGroup.AppearsOn,
    ]);

    return (
        <AppearsOnWrapper>
            <HeaderSpacer />
            <GridEntries entries={artistAppearsOn ? artistAppearsOn.items : null} type="album" />
        </AppearsOnWrapper>
    );
};

// eslint-disable-next-line react/display-name
AppearsOn.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default AppearsOn;
