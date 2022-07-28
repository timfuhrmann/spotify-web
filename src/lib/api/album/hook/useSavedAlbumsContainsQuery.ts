import { useQuery } from "react-query";
import { getSavedAlbumsContains } from "@lib/api/album";
import { useSession } from "@lib/context/session";
import { queryClient } from "@lib/api";

export const useSavedAlbumsContainsQuery = (ids: string[]) => {
    const { access_token } = useSession();

    const queryKey = ["saved-albums-contains", ids.join(","), access_token];

    const data = useQuery(queryKey, () => getSavedAlbumsContains(access_token!, ids), {
        enabled: !!access_token,
    });

    const writeToCache = (value: boolean) => {
        return queryClient.setQueryData<boolean[] | undefined>(queryKey, () => {
            return [value];
        });
    };

    const saveAlbumToCache = () => {
        return writeToCache(true);
    };

    const removeAlbumFromCache = () => {
        return writeToCache(false);
    };

    return { ...data, saveAlbumToCache, removeAlbumFromCache };
};
