import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useArtistsRelatedArtistsQuery = (id: string) => {
    const { access_token } = useSession();

    return useQuery(
        ["artist-related-artists", id, access_token],
        () =>
            request<SpotifyApi.ArtistsRelatedArtistsResponse>(access_token!, {
                url: "/artists/" + id + "/related-artists",
            }),
        { enabled: !!access_token }
    );
};
