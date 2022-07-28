import { useQuery } from "react-query";
import { getArtistsTopTracks } from "@lib/api/artist";
import { useSession } from "@lib/context/session";

export const useArtistsTopTracksQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(
        ["artist-top-tracks", id, access_token],
        () => getArtistsTopTracks(access_token!, id!),
        { enabled: !!access_token && !!id }
    );
};
