import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useNewReleasesQuery = (limit?: number) => {
    const { access_token } = useSession();

    return useQuery(
        "new-releases",
        () =>
            request<SpotifyApi.ListOfNewReleasesResponse>(access_token!, {
                url: "/browse/new-releases",
                params: { limit },
            }),
        {
            enabled: !!access_token,
        }
    );
};
