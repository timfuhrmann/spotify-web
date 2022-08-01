import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { ListInfiniteTracksHead } from "./ListInfiniteTracksHead";
import { TrackGrid } from "@css/helper/track";
import { content } from "@css/helper/content";
import { useOverlayScroll } from "@lib/context/overlay-scroll";
import { createArray } from "@lib/util";
import { Track } from "../Track/Track";

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

const ListSkeleton = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
`;

const ListGrid = styled.div<{ $columns: 3 | 5; $rows: number }>`
    position: relative;
    min-height: ${p => `calc(${p.$rows} * ${p.theme.sizes.playlistTrackHeight / 10}rem)`};

    ${TrackGrid} {
        grid-template-columns: ${p => getGridTemplateColumns(p.$columns)};
    }
`;

interface ListTracksProps {
    columns: 3 | 5;
    rows: number;
    totalRows: number;
    hasMore: boolean;
    loadMore: (page: number) => void;
}

export const ListInfiniteTracks: React.FC<PropsWithChildren<ListTracksProps>> = ({
    rows,
    totalRows,
    columns,
    hasMore,
    loadMore,
    children,
}) => {
    const { targetRef } = useOverlayScroll();

    return (
        <ListWrapper>
            <ListGrid
                role="grid"
                aria-rowcount={totalRows}
                aria-colcount={columns}
                $rows={totalRows}
                $columns={columns}>
                <ListInfiniteTracksHead columns={columns} />
                <InfiniteScroll
                    hasMore={hasMore}
                    loadMore={loadMore}
                    threshold={1500}
                    useWindow={false}
                    getScrollParent={() => targetRef.current}>
                    {children}
                </InfiniteScroll>
                <ListSkeleton aria-hidden>
                    {createArray(totalRows - rows - 1).map(index => (
                        <Track.Skeleton
                            key={index}
                            hideAlbum={columns === 3}
                            hideAlbumCover={columns === 3}
                            hideAddedAt={columns === 3}
                        />
                    ))}
                </ListSkeleton>
            </ListGrid>
        </ListWrapper>
    );
};
