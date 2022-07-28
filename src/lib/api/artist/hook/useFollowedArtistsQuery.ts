import { useQuery } from "react-query";
import { getFollowedArtists } from "@lib/api/artist";
import { useSession } from "@lib/context/session";

export const useFollowedArtistsQuery = () => {
    const { access_token } = useSession();

    return useQuery(["followed-artists", access_token], () => getFollowedArtists(access_token!), {
        enabled: !!access_token,
    });
};
