import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { getSavedAlbums } from "@lib/api/album";

export const useSavedAlbumsQuery = () => {
    const { access_token } = useSession();

    return useQuery(["saved-albums", access_token], () => getSavedAlbums(access_token!), {
        enabled: !!access_token,
    });
};
