import cloneDeep from "lodash.clonedeep";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { getSavedTracksContains } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { useEffect, useMemo } from "react";
import { queryClient } from "@lib/api";
import { InfiniteTracksOptions, useInfiniteTracks } from "@lib/hook/useInfiniteTracks";

interface InfiniteTracksWithSavedTracksContainsOptions<T> extends InfiniteTracksOptions<T> {
    idsFn: (data: T) => string[];
    limit: number;
}

export const useInfiniteTracksWithSavedTracksContains = <T>({
    key,
    limit,
    idsFn,
    ...infiniteTracksOptions
}: InfiniteTracksWithSavedTracksContainsOptions<T>) => {
    const { access_token } = useSession();

    const { tracksPages, ...infiniteTracksResult } = useInfiniteTracks({
        key,
        ...infiniteTracksOptions,
    });

    const { data: savedTracksPages, fetchNextPage: fetchNextSavedTracksPage } = useInfiniteQuery(
        ["saved-tracks-contains", key, access_token],
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
            ["saved-tracks-contains", key, access_token],
            data => {
                if (!data) {
                    return data;
                }

                const newData = cloneDeep(data);
                const pageIndex = Math.floor(index / limit);
                const page = newData.pages[pageIndex];

                if (!page) {
                    return newData;
                }

                const trackIndex = index - pageIndex * limit;

                if (page && page[trackIndex] !== undefined) {
                    page[trackIndex] = value;
                }

                return newData;
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
        tracksPages,
        savedTracks,
        addSavedTrackToCache,
        removeSavedTrackFromCache,
        ...infiniteTracksResult,
    };
};
