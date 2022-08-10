import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";

export const useFollowedArtistsContains = (ids: string[]) => {
    const { access_token } = useSession();

    const queryKey = ["followed-artists-contains", ids.join(","), access_token];

    const data = useQuery(
        queryKey,
        () =>
            request<SpotifyApi.UserFollowsUsersOrArtistsResponse>(access_token!, {
                url: "/me/following/contains",
                params: { type: "artist", ids: ids.join(",") },
            }),
        {
            enabled: !!access_token,
        }
    );

    const writeToCache = (index: number, value: boolean) => {
        return queryClient.setQueryData<boolean[] | undefined>(queryKey, cachedData => {
            if (!cachedData) {
                return;
            }

            return cachedData.map((previousValue, idx) => (idx === index ? value : previousValue));
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
