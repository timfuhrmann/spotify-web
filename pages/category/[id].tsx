import { NextPageWithLayout } from "@type/page";
import styled from "styled-components";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import { useCategoriesPlaylistsQuery } from "@lib/api/browse/hook/useCategoriesPlaylistsQuery";
import { useRouter } from "next/router";
import { getIdFromQuery } from "@lib/util";
import { useCategoryQuery } from "@lib/api/browse/hook/useCategoryQuery";

const CategoryWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Category: NextPageWithLayout = () => {
    const { query } = useRouter();

    const id = getIdFromQuery(query);

    const { data: category } = useCategoryQuery(id);
    const { data: categoryPlaylists } = useCategoriesPlaylistsQuery(id);

    return (
        <CategoryWrapper>
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