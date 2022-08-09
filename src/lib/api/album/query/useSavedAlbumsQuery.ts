import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useSavedAlbumsQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["saved-albums", access_token],
        () => request<SpotifyApi.UsersSavedAlbumsResponse>(access_token!, { url: "/me/albums" }),
        {
            enabled: !!access_token,
        }
    );
};
