import { useQuery } from "react-query";
import { getAlbum } from "@lib/api/album";
import { useSession } from "@lib/context/session";

export const useAlbumQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(["album", id, access_token], () => getAlbum(access_token!, id!), {
        enabled: !!access_token && !!id,
    });
};
