import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface RemoveAlbumProps {
    ids: string[];
}

export const useRemoveAlbumMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ ids }: RemoveAlbumProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, { url: "/me/albums", data: { ids }, method: "DELETE" });
    });
};
