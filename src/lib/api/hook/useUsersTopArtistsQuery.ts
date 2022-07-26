import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { getUsersTopArtists } from "@lib/api/user";

export const useUsersTopArtistsQuery = (limit?: number) => {
    const { access_token } = useSession();

    return useQuery(
        ["users-top-artists", access_token],
        () => getUsersTopArtists(access_token!, limit),
        {
            enabled: !!access_token,
        }
    );
};
