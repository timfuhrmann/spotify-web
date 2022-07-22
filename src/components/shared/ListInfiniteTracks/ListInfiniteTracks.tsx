import React, { ComponentProps, PropsWithChildren } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { getMainScrollStage } from "@lib/util";
import { ListInfiniteTracksHead } from "./ListInfiniteTracksHead";
import { TrackGrid } from "@css/helper/track";

const getGridTemplateColumns = (columns: 3 | 5) => {
    switch (columns) {
        case 3:
            return "[index] 1.6rem [first] 6fr [last] minmax(12rem, 1fr)";
        case 5:
            return "[index] 1.6rem [first] 6fr [second] 4fr [third] 3fr [last] minmax(12rem, 1fr)";
    }
};

const ListWrapper = styled.div`
    padding: 0 3.2rem;
`;

const ListGrid = styled.div<{ $columns: 3 | 5; $rows: number }>`
    min-height: ${p => `calc(${p.$rows} * ${p.theme.sizes.playlistTrackHeight})`};

    ${TrackGrid} {
        grid-template-columns: ${p => getGridTemplateColumns(p.$columns)};
    }
`;

interface ListTracksProps {
    columns: 3 | 5;
    rows: number;
    hasMore: boolean;
    loadMore: (page: number) => void;
}

export const ListInfiniteTracks: React.FC<PropsWithChildren<ListTracksProps>> = ({
    rows,
    columns,
    hasMore,
    loadMore,
    children,
}) => {
    return (
        <ListWrapper>
            <ListGrid
                role="grid"
                aria-rowcount={rows}
                aria-colcount={columns}
                $rows={rows}
                $columns={columns}>
                <ListInfiniteTracksHead columns={columns} />
                <InfiniteScroll
                    hasMore={hasMore}
                    loadMore={loadMore}
                    threshold={1500}
                    useWindow={false}
                    getScrollParent={getMainScrollStage}>
                    {children}
                </InfiniteScroll>
            </ListGrid>
        </ListWrapper>
    );
};
