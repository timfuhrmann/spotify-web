import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { getFeaturedPlaylists } from "@lib/api/playlist";

export const useFeaturedPlaylistsQuery = (limit?: number) => {
    const { access_token } = useSession();

    return useQuery("featured-playlists", () => getFeaturedPlaylists(access_token!, limit), {
        enabled: !!access_token,
    });
};
