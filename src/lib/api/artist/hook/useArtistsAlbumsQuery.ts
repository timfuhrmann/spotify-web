import { useQuery } from "react-query";
import { getArtistsAlbums } from "@lib/api/artist";
import { useSession } from "@lib/context/session";
import { AlbumGroup } from "@lib/api/album";

export const useArtistsAlbumsQuery = (
    id: string | undefined,
    include_groups?: AlbumGroup[],
    limit?: number
) => {
    const { access_token } = useSession();

    const queryKey = ["artist-appears-on", id, access_token];

    if (include_groups) {
        queryKey.push(include_groups.join(","));
    }

    return useQuery(queryKey, () => getArtistsAlbums(access_token!, id!, include_groups, limit), {
        enabled: !!access_token || !!id,
    });
};
