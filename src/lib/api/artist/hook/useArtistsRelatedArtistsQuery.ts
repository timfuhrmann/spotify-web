import { useQuery } from "react-query";
import { getArtistsRelatedArtists } from "@lib/api/artist";
import { useSession } from "@lib/context/session";

export const useArtistsRelatedArtistsQuery = (id: string) => {
    const { access_token } = useSession();

    return useQuery(
        ["artist-related-artists", id, access_token],
        () => getArtistsRelatedArtists(access_token!, id),
        { enabled: !!access_token }
    );
};
