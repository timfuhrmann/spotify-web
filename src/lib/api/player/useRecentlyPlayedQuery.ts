import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useRecentlyPlayedQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["recently-played", access_token],
        () =>
            request<SpotifyApi.UsersRecentlyPlayedTracksResponse>(access_token!, {
                url: "/me/player/recently-played",
            }),
        { enabled: !!access_token }
    );
};
