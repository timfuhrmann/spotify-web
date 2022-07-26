import { useQuery } from "react-query";
import { AlbumGroup, getArtistsAlbums } from "@lib/api/artist";
import { useSession } from "@lib/context/session";

export const useArtistsAlbumsQuery = (id: string | undefined, include_groups?: AlbumGroup[]) => {
    const { access_token } = useSession();

    const queryKey = ["artist-appears-on", id, access_token];

    if (include_groups) {
        queryKey.push(include_groups.join(","));
    }

    return useQuery(queryKey, () => getArtistsAlbums(access_token, id, include_groups), {
        enabled: !!access_token || !!id,
    });
};
