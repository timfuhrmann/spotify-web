import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useCurrentlyPlayingQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["currently-playing", access_token],
        () =>
            request<SpotifyApi.CurrentlyPlayingResponse>(access_token!, {
                url: "/me/player/currently-playing",
            }),
        { enabled: !!access_token }
    );
};
