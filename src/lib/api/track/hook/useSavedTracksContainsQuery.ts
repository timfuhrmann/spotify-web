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
        (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, true);
            saveTracks(access_token, [id]);
        },
        [access_token, ids]
    );

    const handleRemoveTrack = useCallback(
        (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, false);
            removeTracks(access_token, [id]);
        },
        [access_token, ids]
    );

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
