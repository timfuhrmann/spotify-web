import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useFollowedArtistsQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["followed-artists", access_token],
        () =>
            request<SpotifyApi.UsersFollowedArtistsResponse>(access_token!, {
                url: "/me/following",
                params: { type: "artist" },
            }),
        {
            enabled: !!access_token,
        }
    );
};
