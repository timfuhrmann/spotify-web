import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useCategoriesPlaylistsQuery = (id: string | undefined, limit: number = 49) => {
    const { access_token } = useSession();

    return useQuery(
        ["categories-playlists", id, access_token],
        () =>
            request<SpotifyApi.CategoryPlaylistsResponse>(access_token!, {
                url: "/browse/categories/" + id + "/playlists",
                params: { limit, country: "US", locale: "en-US" },
            }),
        { enabled: !!access_token && !!id }
    );
};
