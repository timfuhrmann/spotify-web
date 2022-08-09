import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useCategoryQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["category", access_token],
        () =>
            request<SpotifyApi.SingleCategoryResponse>(access_token!, {
                url: "/browse/categories/" + id!,
                params: { country: "US", locale: "en-US" },
            }),
        {
            enabled: !!access_token && !!id,
        }
    );
};
