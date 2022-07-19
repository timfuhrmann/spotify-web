import {
    GetNextPageParamFunction,
    InfiniteData,
    QueryFunction,
    useInfiniteQuery,
} from "react-query";
import { getSavedTracksContains } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { useEffect, useMemo } from "react";
import { queryClient } from "@lib/api";

interface TrackListOptions<T> {
    key: string;
    id: string;
    queryFn: QueryFunction<T | undefined>;
    getNextPageParam: GetNextPageParamFunction<T | undefined>;
    idsFn: (data: T) => string[];
    initialTracks: T;
    limit: number;
}

export const useInfiniteTracks = <T = SpotifyApi.PlaylistTrackResponse>({
    key,
    id,
    queryFn,
    limit,
    getNextPageParam,
    idsFn,
    initialTracks,
}: TrackListOptions<T>) => {
    const { access_token } = useSession();

    const {
        data: tracksPages,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
    } = useInfiniteQuery([key, id, access_token], queryFn, {
        cacheTime: 0,
        getNextPageParam,
        initialData: {
            pages: [initialTracks],
            pageParams: [0],
        },
    });

    const { data: savedTracksPages, fetchNextPage: fetchNextSavedTracksPage } = useInfiniteQuery(
        ["saved-tracks-contains", id, access_token],
        async ({ pageParam = 0 }) => {
            const ids = idsFromInfinitePages(pageParam);

            if (!ids) {
                return;
            }

            const res = await Promise.all(
                Array.from(Array(Math.ceil(ids.length / 50))).map((_, i) =>
                    getSavedTracksContains(access_token, ids.slice(i * 50, (i + 1) * 50))
                )
            );

            return res.flatMap(arr => arr || []);
        },
        {
            cacheTime: 0,
            structuralSharing: false,
        }
    );

    useEffect(() => {
        if (!tracksPages) {
            return;
        }

        fetchNextSavedTracksPage({
            pageParam: tracksPages.pages.length - 1,
        });
    }, [tracksPages, fetchNextSavedTracksPage]);

    const savedTracks = useMemo<boolean[]>(() => {
        if (!savedTracksPages) {
            return [];
        }

        return savedTracksPages.pages.flatMap(page => page || []);
    }, [savedTracksPages]);

    const writeToSavedTracksCache = (value: boolean, index: number) => {
        return queryClient.setQueryData<InfiniteData<boolean[] | undefined> | undefined>(
            ["saved-tracks-contains", id, access_token],
            data => {
                if (!data) {
                    return data;
                }

                const pageIndex = Math.floor(index / limit);
                const page = data.pages[pageIndex];

                if (!page) {
                    return data;
                }

                const trackIndex = index - pageIndex * limit;

                if (page && page[trackIndex] !== undefined) {
                    page[trackIndex] = value;
                }

                return { pages: data.pages, pageParams: data.pageParams };
            }
        );
    };

    const addSavedTrackToCache = (index: number) => {
        writeToSavedTracksCache(true, index);
    };

    const removeSavedTrackFromCache = (index: number) => {
        writeToSavedTracksCache(false, index);
    };

    const idsFromInfinitePages = (index: number): string[] | null => {
        if (!tracksPages) {
            return null;
        }

        const page = tracksPages.pages[index];
        return page ? idsFn(page) : null;
    };

    return {
        isLoading: isLoading || isFetching,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        addSavedTrackToCache,
        removeSavedTrackFromCache,
    };
};
