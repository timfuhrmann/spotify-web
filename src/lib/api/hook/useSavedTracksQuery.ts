import { useQuery } from "react-query";
import { getSavedTracks } from "@lib/api/track";
import { useSession } from "@lib/context/session";

export const useSavedTracksQuery = () => {
    const { access_token } = useSession();

    return useQuery(["saved-tracks", access_token], () => getSavedTracks(access_token), {
        enabled: !!access_token,
    });
};
