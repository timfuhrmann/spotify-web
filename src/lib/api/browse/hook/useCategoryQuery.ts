import { useQuery } from "react-query";
import { getCategoriesPlaylists, getCategory } from "@lib/api/browse";
import { useSession } from "@lib/context/session";

export const useCategoryQuery = (id: string | undefined) => {
    const { access_token } = useSession();

    return useQuery(["category", access_token], () => getCategory(access_token!, id!), {
        enabled: !!access_token && !!id,
    });
};
