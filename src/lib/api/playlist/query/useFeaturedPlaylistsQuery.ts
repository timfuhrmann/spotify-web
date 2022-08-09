import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { request } from "@lib/api";

export const useFeaturedPlaylistsQuery = (limit: number = 20) => {
    const { access_token } = useSession();

    return useQuery(
        "featured-playlists",
        () =>
            request<SpotifyApi.ListOfFeaturedPlaylistsResponse>(access_token!, {
                url: "/browse/featured-playlists",
                params: { country: "US", locale: "en-US", limit },
            }),
        {
            enabled: !!access_token,
        }
    );
};
