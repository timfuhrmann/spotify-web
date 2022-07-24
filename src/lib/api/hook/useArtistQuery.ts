import { useQuery } from "react-query";
import { getArtist } from "@lib/api/artist";
import { useSession } from "@lib/context/session";

export const useArtistQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(["artist", id, access_token], () => getArtist(access_token, id), {
        enabled: !!access_token && !!id,
    });
};
