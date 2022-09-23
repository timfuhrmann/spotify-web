import { NextPageWithLayout } from "@type/page";
import styled from "styled-components";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import { useCategoriesPlaylistsQuery } from "@lib/api/browse/query/useCategoriesPlaylistsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { useCategoryQuery } from "@lib/api/browse/query/useCategoryQuery";
import { Meta } from "@lib/meta";
import React from "react";

const CategoryWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Category: NextPageWithLayout = () => {
    const { query } = useRouter();

    const id = getIdFromQuery(query);

    const { data: category } = useCategoryQuery(id);
    const { data: categoryPlaylists } = useCategoriesPlaylistsQuery(id);

    return (
        <CategoryWrapper>
            <Meta title={category ? category.name : "Category"} />
            <HeaderSpacer />
            <GridEntries
                type="playlist"
                headline={category ? category.name : null}
                entries={categoryPlaylists ? categoryPlaylists.playlists.items : null}
            />
        </CategoryWrapper>
    );
};

// eslint-disable-next-line react/display-name
Category.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Category;
