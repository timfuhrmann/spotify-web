import cloneDeep from "lodash.clonedeep";
import { useQuery } from "react-query";
import { getSavedTracksContains } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";

export const useSavedTracksContainsQuery = (ids: string[]) => {
    const { access_token } = useSession();

    const queryKey = ["saved-tracks-contains", ids.join(","), access_token];

    const data = useQuery(queryKey, () => getSavedTracksContains(access_token!, ids), {
        enabled: !!access_token,
    });

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

    const saveTrackToCache = (index: number) => {
        return writeToCache(index, true);
    };

    const removeTrackFromCache = (index: number) => {
        return writeToCache(index, false);
    };

    return { ...data, saveTrackToCache, removeTrackFromCache };
};
