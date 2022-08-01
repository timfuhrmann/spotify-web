import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { ListInfiniteTracksHead } from "./ListInfiniteTracksHead";
import { TrackGrid } from "@css/helper/track";
import { content } from "@css/helper/content";
import { useOverlayScroll } from "@lib/context/overlay-scroll";
import { pathnameFromAsPath } from "@lib/util";
import { useRouter } from "next/router";
import { ListInfiniteTracksLoader } from "./ListInfiniteTracksLoader";

const getGridTemplateColumns = (columns: 3 | 5) => {
    switch (columns) {
        case 3:
            return "[index] 1.6rem [first] 6fr [last] minmax(12rem, 1fr)";
        case 5:
            return "[index] 1.6rem [first] 6fr [second] 4fr [third] 3fr [last] minmax(12rem, 1fr)";
    }
};

const ListWrapper = styled.div`
    ${content()}
`;

const ListGrid = styled.div<{ $columns: 3 | 5 }>`
    position: relative;

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
    const { asPath } = useRouter();
    const { targetRef } = useOverlayScroll();

    const pathname = pathnameFromAsPath(asPath);

    return (
        <ListWrapper>
            <ListGrid role="grid" aria-colcount={columns} aria-rowcount={rows} $columns={columns}>
                <ListInfiniteTracksHead key={pathname} columns={columns} />
                <InfiniteScroll
                    hasMore={hasMore}
                    loadMore={loadMore}
                    threshold={1500}
                    useWindow={false}
                    loader={<ListInfiniteTracksLoader columns={columns} />}
                    getScrollParent={() => targetRef.current}>
                    {children}
                </InfiniteScroll>
            </ListGrid>
        </ListWrapper>
    );
};
