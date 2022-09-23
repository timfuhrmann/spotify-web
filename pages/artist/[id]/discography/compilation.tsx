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

const CompilationWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Compilation: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistCompilations } = useArtistsAlbumsQuery(getIdFromQuery(query), [
        AlbumGroup.Compilation,
    ]);

    return (
        <CompilationWrapper>
            <Meta title="Compilations" />
            <HeaderSpacer />
            <GridEntries
                entries={artistCompilations ? artistCompilations.items : null}
                type="album"
            />
        </CompilationWrapper>
    );
};

// eslint-disable-next-line react/display-name
Compilation.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Compilation;
