import cloneDeep from "lodash.clonedeep";
import { useQuery } from "react-query";
import { getFollowedArtistsContains } from "@lib/api/artist";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";

export const useFollowedArtistsContains = (ids: string[]) => {
    const { access_token } = useSession();

    const queryKey = ["followed-artists-contains", ids.join(","), access_token];

    const data = useQuery(queryKey, () => getFollowedArtistsContains(access_token!, ids), {
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

    const saveArtistToCache = (index: number) => {
        return writeToCache(index, true);
    };

    const removeArtistFromCache = (index: number) => {
        return writeToCache(index, false);
    };

    return { ...data, saveArtistToCache, removeArtistFromCache };
};
