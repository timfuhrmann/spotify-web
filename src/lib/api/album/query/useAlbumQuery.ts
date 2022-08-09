import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const useAlbumQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["album", id, access_token],
        () =>
            request<SpotifyApi.AlbumObjectFull>(access_token!, {
                url: "/albums/" + id,
            }),
        {
            enabled: !!access_token && !!id,
        }
    );
};
