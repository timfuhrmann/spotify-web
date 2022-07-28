import { useQuery } from "react-query";
import { getCategoriesPlaylists } from "@lib/api/browse";
import { useSession } from "@lib/context/session";

export const useCategoriesPlaylistsQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["categories-playlists", id, access_token],
        () => getCategoriesPlaylists(access_token!, id!),
        { enabled: !!access_token && !!id }
    );
};
