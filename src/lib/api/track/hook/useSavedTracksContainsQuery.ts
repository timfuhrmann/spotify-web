import cloneDeep from "lodash.clonedeep";
import { useQuery } from "react-query";
import { getSavedTracksContains, removeTracks, saveTracks } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";
import { useCallback } from "react";

export const useSavedTracksContainsQuery = (ids: string[]) => {
    const { access_token } = useSession();

    const queryKey = ["saved-tracks-contains", ids.join(","), access_token];

    const data = useQuery(queryKey, () => getSavedTracksContains(access_token!, ids), {
        enabled: !!access_token && !!ids.length,
    });

    const handleSaveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, true);
            await saveTracks(access_token, [id]);
            invalidateCache();
        },
        [access_token, ids]
    );

    const handleRemoveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, false);
            await removeTracks(access_token, [id]);
            invalidateCache();
        },
        [access_token, ids]
    );

    const invalidateCache = () => {
        queryClient.invalidateQueries({
            predicate: ({ queryKey }) =>
                queryKey.includes("saved-tracks") || queryKey.includes("saved-tracks-contains"),
        });
    };

    const writeToCache = (index: number, value: boolean) => {
        return queryClient.setQueryData<boolean[] | undefined>(queryKey, cachedData => {
            if (!cachedData) {
                return;
            }

            const newData = cloneDeep(cachedData);
            newData[index] = value;

            return newData;
        });
    };

    return { ...data, handleSaveTrack, handleRemoveTrack };
};
