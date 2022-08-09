import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface SaveAlbumProps {
    ids: string[];
}

export const useSaveAlbumMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ ids }: SaveAlbumProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, { url: "/me/albums", data: { ids }, method: "PUT" });
    });
};
