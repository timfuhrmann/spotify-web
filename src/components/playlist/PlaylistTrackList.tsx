import React, { useRef } from "react";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { PlaylistTrack } from "./PlaylistTrack";
import { usePlaylist } from "./PlaylistProvider";

const ListWrapper = styled.div<{ $totalTracks: number }>`
    height: ${p => `calc(${p.$totalTracks} * ${p.theme.sizes.playlistTrackHeight})`};
    padding: 0 3.2rem;
`;

const ListSentry = styled.div``;

export const PlaylistTrackList: React.FC = () => {
    const { tracks, totalTracks, isLoading, fetchNextPage, hasNextPage } = usePlaylist();

    const [sentryRef] = useInfiniteScroll({
        hasNextPage,
        loading: isLoading,
        onLoadMore: fetchNextPage,
        rootMargin: "0px 0px 400px 0px",
    });

    return (
        <ListWrapper $totalTracks={totalTracks}>
            {tracks.map(
                (item, index) =>
                    item.track && (
                        <PlaylistTrack
                            key={index}
                            index={index}
                            {...(item as Ensure<SpotifyApi.PlaylistTrackObject, "track">)}
                        />
                    )
            )}
            {(isLoading || hasNextPage) && <ListSentry ref={sentryRef} />}
        </ListWrapper>
    );
};
