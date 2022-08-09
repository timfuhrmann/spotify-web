import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useArtistsTopTracksQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["artist-top-tracks", id, access_token],
        async () => {
            const { tracks } = await request<SpotifyApi.ArtistsTopTracksResponse>(access_token!, {
                url: "/artists/" + id + "/top-tracks",
                params: { market: "US", locale: "en-US" },
            });

            return tracks;
        },
        { enabled: !!access_token && !!id }
    );
};
