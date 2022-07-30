import { useMutation } from "react-query";
import { BrowseTypeType, searchByType } from "@lib/api/browse";

interface MutationVariables {
    access_token: string;
    query: string;
    type: BrowseTypeType[];
}

export const useSearchByTypeMutation = (limit?: number) => {
    return useMutation("search-by-type", ({ access_token, query, type }: MutationVariables) =>
        searchByType(access_token, query, type, limit)
    );
};
