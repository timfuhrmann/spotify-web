import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useArtistQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["artist", id, access_token],
        () => request<SpotifyApi.ArtistObjectFull>(access_token!, { url: "/artists/" + id }),
        {
            enabled: !!access_token && !!id,
        }
    );
};
