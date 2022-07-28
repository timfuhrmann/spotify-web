import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useMultipleCategoriesQuery } from "@lib/api/browse/hook/useMultipleCategoriesQuery";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import styled from "styled-components";
import { useMemo } from "react";
import { EntryProps } from "../../src/components/shared/Entry";

const BrowseWrapper = styled.div`
    padding-bottom: 2.4rem;
`;

const Browse: NextPageWithLayout = () => {
    const { data } = useMultipleCategoriesQuery();

    const entries = useMemo<EntryProps[] | null>(() => {
        if (!data) {
            return null;
        }

        return data.categories.items.map(({ icons, ...rest }) => ({
            type: "category",
            images: icons,
            ...rest,
        }));
    }, [data]);

    return (
        <BrowseWrapper>
            <HeaderSpacer />
            <GridEntries headline="Browse all" type="category" entries={entries} />
        </BrowseWrapper>
    );
};

// eslint-disable-next-line react/display-name
Browse.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Browse;
