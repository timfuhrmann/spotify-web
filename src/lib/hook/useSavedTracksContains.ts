import { useQuery } from "react-query";
import { getSavedTracksContains } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";
import cloneDeep from "lodash.clonedeep";

export const useSavedTracksContains = (key: string, ids: string[]) => {
    const { access_token } = useSession();

    const data = useQuery(
        ["saved-tracks-contains", key, access_token],
        () => getSavedTracksContains(access_token, ids),
        { enabled: !!access_token }
    );

    const writeToCache = (index: number, value: boolean) => {
        return queryClient.setQueryData<boolean[] | undefined>(
            ["saved-tracks-contains", key, access_token],
            cachedData => {
                if (!cachedData) {
                    return;
                }

                const newData = cloneDeep(cachedData);
                newData[index] = value;

                return newData;
            }
        );
    };

    const saveTrackToCache = (index: number) => {
        return writeToCache(index, true);
    };

    const removeTrackFromCache = (index: number) => {
        return writeToCache(index, false);
    };

    return { ...data, saveTrackToCache, removeTrackFromCache };
};
