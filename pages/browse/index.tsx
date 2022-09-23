import styled from "styled-components";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useMultipleCategoriesQuery } from "@lib/api/browse/query/useMultipleCategoriesQuery";
import { GridEntries } from "../../src/components/shared/GridEntries";
import { HeaderSpacer } from "../../src/components/layout/HeaderSpacer";
import React, { useEffect, useMemo } from "react";
import { EntryProps } from "../../src/components/shared/Entry";
import { useAppDispatch } from "@lib/redux";
import { resetSearch } from "@lib/redux/reducer/search";
import { Meta } from "@lib/meta";

const BrowseWrapper = styled.div`
    padding: 2.4rem 0;
`;

const Browse: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();
    const { data } = useMultipleCategoriesQuery();

    useEffect(() => {
        dispatch(resetSearch());
    }, []);

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
            <Meta title="Browse" />
            <HeaderSpacer />
            <GridEntries headline="Browse all" type="category" entries={entries} />
        </BrowseWrapper>
    );
};

// eslint-disable-next-line react/display-name
Browse.getLayout = page => {
    return <PrimaryLayout hasSearch>{page}</PrimaryLayout>;
};

export default Browse;
