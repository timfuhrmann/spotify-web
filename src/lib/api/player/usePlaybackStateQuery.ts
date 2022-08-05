import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const usePlaybackStateQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["playback-state", access_token],
        () => request<SpotifyApi.CurrentPlaybackResponse>(access_token!, { url: "/me/player" }),
        { enabled: !!access_token }
    );
};
