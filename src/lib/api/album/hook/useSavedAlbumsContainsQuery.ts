import { useQuery } from "react-query";
import { getSavedAlbumsContains, removeAlbum, saveAlbum } from "@lib/api/album";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";
import { useCallback } from "react";
import cloneDeep from "lodash.clonedeep";

export const useSavedAlbumsContainsQuery = (ids: string[]) => {
    const { access_token } = useSession();

    const queryKey = ["saved-albums-contains", ids.join(","), access_token];

    const data = useQuery(queryKey, () => getSavedAlbumsContains(access_token!, ids), {
        enabled: !!access_token,
    });

    const handleSaveAlbum = useCallback(
        (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, true);
            saveAlbum(access_token, [id]);
        },
        [access_token]
    );

    const handleRemoveAlbum = useCallback(
        (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, false);
            removeAlbum(access_token, [id]);
        },
        [access_token]
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

    return { ...data, handleSaveAlbum, handleRemoveAlbum };
};
