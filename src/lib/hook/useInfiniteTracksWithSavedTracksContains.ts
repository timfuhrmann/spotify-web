import cloneDeep from "lodash.clonedeep";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { getSavedTracksContains } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { useCallback, useEffect, useMemo } from "react";
import { queryClient } from "@lib/api";
import { InfiniteTracksOptions, useInfiniteTracks } from "@lib/hook/useInfiniteTracks";
import { createArray } from "@lib/util";
import { useSaveTracksMutation } from "@lib/api/track/mutation/useSaveTracksMutation";
import { useRemoveTracksMutation } from "@lib/api/track/mutation/useRemoveTracksMutation";

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
    const { mutate: mutateSave } = useSaveTracksMutation();
    const { mutate: mutateRemove } = useRemoveTracksMutation();

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
                createArray(Math.ceil(ids.length / 50)).map((_, i) =>
                    getSavedTracksContains(access_token!, ids.slice(i * 50, (i + 1) * 50))
                )
            );

            return res.flatMap(arr => arr || []);
        },
        { enabled: !!access_token, cacheTime: 0 }
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

    const handleSaveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            addSavedTrackToCache(index);
            mutateSave({ ids: [id] });
        },
        [access_token]
    );

    const handleRemoveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            removeSavedTrackFromCache(index);
            mutateRemove({ ids: [id] });
        },
        [access_token]
    );

    const addSavedTrackToCache = (index: number) => {
        writeToSavedTracksCache(true, index);
    };

    const removeSavedTrackFromCache = (index: number) => {
        writeToSavedTracksCache(false, index);
    };

    const writeToSavedTracksCache = (value: boolean, index: number) => {
        return queryClient.setQueryData<InfiniteData<boolean[] | undefined> | undefined>(
            ["saved-tracks-contains", key, access_token],
            cachedData => {
                if (!cachedData) {
                    return;
                }

                const newData = cloneDeep(cachedData);
                const pageIndex = Math.floor(index / limit);
                const page = newData.pages[pageIndex];

                if (!page) {
                    return newData;
                }

                const trackIndex = index - pageIndex * limit;
                page[trackIndex] = value;

                return newData;
            }
        );
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
        handleSaveTrack,
        handleRemoveTrack,
        addSavedTrackToCache,
        removeSavedTrackFromCache,
        ...infiniteTracksResult,
    };
};
