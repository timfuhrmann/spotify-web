import { useQuery } from "react-query";
import { getArtistRelatedArtists } from "@lib/api/artist";
import { useSession } from "@lib/context/session";

export const useArtistsRelatedArtists = (id: string) => {
    const { access_token } = useSession();

    return useQuery(
        ["artist-related-artists", id, access_token],
        () => getArtistRelatedArtists(access_token, id),
        { enabled: !!access_token }
    );
};
