import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useDevicesQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["devices", access_token],
        () =>
            request<SpotifyApi.UserDevicesResponse>(access_token!, {
                url: "/me/player/devices",
            }),
        { enabled: !!access_token }
    );
};
