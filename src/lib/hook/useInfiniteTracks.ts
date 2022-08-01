import {
    GetNextPageParamFunction,
    InfiniteData,
    QueryFunction,
    useInfiniteQuery,
} from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";

export interface InfiniteTracksOptions<T> {
    key: string | null;
    enabled: boolean;
    queryFn: QueryFunction<T | undefined>;
    getNextPageParam: GetNextPageParamFunction<T | undefined>;
    initialTracks: T | null;
}

export const useInfiniteTracks = <T>({
    key,
    queryFn,
    enabled,
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
    } = useInfiniteQuery(["tracks", key, access_token], queryFn, {
        enabled: !!key && enabled,
        cacheTime: 0,
        getNextPageParam,
        initialData: initialTracks
            ? {
                  pages: [initialTracks],
                  pageParams: [0],
              }
            : undefined,
    });

    const writeToTracksCache = (
        updater: (
            data: InfiniteData<T | undefined> | undefined
        ) => InfiniteData<T | undefined> | undefined
    ) => {
        return queryClient.setQueryData<InfiniteData<T | undefined> | undefined>(
            ["tracks", key, access_token],
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
