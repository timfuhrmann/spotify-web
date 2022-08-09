import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";

export const usePlaylistQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["playlist", id, access_token],
        () => request<SpotifyApi.PlaylistObjectFull>(access_token!, { url: "/playlists/" + id! }),
        {
            enabled: !!access_token && !!id,
        }
    );
};
