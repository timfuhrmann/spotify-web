import { useQuery } from "react-query";
import { getMultipleCategories } from "@lib/api/browse";
import { useSession } from "@lib/context/session";

export const useMultipleCategoriesQuery = () => {
    const { access_token } = useSession();

    return useQuery(
        ["multiple-categories", access_token],
        () => getMultipleCategories(access_token!),
        { enabled: !!access_token }
    );
};
