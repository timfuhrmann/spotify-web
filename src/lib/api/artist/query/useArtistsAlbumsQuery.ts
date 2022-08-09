import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { AlbumGroup } from "@type/album";
import { request } from "@lib/api";

export const useArtistsAlbumsQuery = (
    id: string | undefined,
    include_groups: AlbumGroup[] = [AlbumGroup.Album, AlbumGroup.Single, AlbumGroup.Compilation],
    limit: number = 50
) => {
    const { access_token } = useSession();

    const queryKey = ["artist-appears-on", id, access_token];

    if (include_groups) {
        queryKey.push(include_groups.join(","));
    }

    return useQuery(
        queryKey,
        () =>
            request<SpotifyApi.ArtistsAlbumsResponse>(access_token!, {
                url: "/artists/" + id + "/albums",
                params: { include_groups: include_groups.join(","), limit },
            }),
        {
            enabled: !!access_token || !!id,
        }
    );
};
