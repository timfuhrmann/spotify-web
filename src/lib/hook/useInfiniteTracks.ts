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

export interface InfiniteTracksOptions<T> {
    key: string[];
    queryFn: QueryFunction<T | undefined>;
    getNextPageParam: GetNextPageParamFunction<T | undefined>;
    initialTracks: T;
}

export const useInfiniteTracks = <T>({
    key,
    queryFn,
    getNextPageParam,
    initialTracks,
}: InfiniteTracksOptions<T>) => {
    const { access_token } = useSession();

    const {
        data: tracksPages,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
    } = useInfiniteQuery([...key, access_token], queryFn, {
        cacheTime: 0,
        getNextPageParam,
        initialData: {
            pages: [initialTracks],
            pageParams: [0],
        },
    });

    const writeToTracksCache = (
        updater: (
            data: InfiniteData<T | undefined> | undefined
        ) => InfiniteData<T | undefined> | undefined
    ) => {
        return queryClient.setQueryData<InfiniteData<T | undefined> | undefined>(
            [...key, access_token],
            data => updater(data)
        );
    };

    return {
        isLoading: isLoading || isFetching,
        hasNextPage: hasNextPage || false,
        tracksPages,
        fetchNextPage,
        writeToTracksCache,
    };
};