import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";
import { useCallback } from "react";
import { useSaveAlbumMutation } from "@lib/api/album/mutation/useSaveAlbumMutation";
import { useRemoveAlbumMutation } from "@lib/api/album/mutation/useRemoveAlbumMutation";

export const useSavedAlbumsContainsQuery = (ids: string[]) => {
    const { access_token } = useSession();
    const { mutate: mutateSave } = useSaveAlbumMutation();
    const { mutate: mutateRemove } = useRemoveAlbumMutation();

    const queryKey = ["saved-albums-contains", ids.join(","), access_token];

    const data = useQuery(
        queryKey,
        () =>
            request<boolean[]>(access_token!, {
                url: "/me/albums/contains",
                params: { ids: ids.join(",") },
            }),
        {
            enabled: !!access_token,
        }
    );

    const handleSaveAlbum = useCallback(
        (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, true);
            mutateSave({ ids: [id] });
        },
        [access_token]
    );

    const handleRemoveAlbum = useCallback(
        (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            writeToCache(index, false);
            mutateRemove({ ids: [id] });
        },
        [access_token]
    );

    const writeToCache = (index: number, value: boolean) => {
        return queryClient.setQueryData<boolean[] | undefined>(queryKey, cachedData => {
            if (!cachedData) {
                return;
            }

            return cachedData.map((previousValue, idx) => (idx === index ? value : previousValue));
        });
    };

    return { ...data, handleSaveAlbum, handleRemoveAlbum };
};
