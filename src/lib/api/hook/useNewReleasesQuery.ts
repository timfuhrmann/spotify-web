import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { getNewReleases } from "@lib/api/album";

export const useNewReleasesQuery = (limit?: number) => {
    const { access_token } = useSession();

    return useQuery("new-releases", () => getNewReleases(access_token!, limit), {
        enabled: !!access_token,
    });
};
