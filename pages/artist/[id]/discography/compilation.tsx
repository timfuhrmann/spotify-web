import React from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../../../src/components/shared/GridEntries";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { HeaderSpacer } from "../../../../src/components/layout/HeaderSpacer";

const CompilationWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Compilation: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data: artistCompilations } = useArtistsAlbumsQuery(getIdFromQuery(query), [
        "compilation",
    ]);

    return (
        <CompilationWrapper>
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
