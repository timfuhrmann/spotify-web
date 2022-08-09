import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useMultipleCategoriesQuery = (limit: number = 49) => {
    const { access_token } = useSession();

    return useQuery(
        ["multiple-categories", access_token],
        () =>
            request<SpotifyApi.MultipleCategoriesResponse>(access_token!, {
                url: "/browse/categories",
                params: { limit, country: "US", locale: "en-US" },
            }),
        { enabled: !!access_token }
    );
};
