import { useQuery } from "react-query";
import { getPlaylist } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";

export const usePlaylistQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(["playlist", id, access_token], () => getPlaylist(access_token, id), {
        enabled: !!access_token && !!id,
    });
};
