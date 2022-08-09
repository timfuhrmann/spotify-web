import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface RemoveTracksProps {
    ids: string[];
}

export const useRemoveTracksMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ ids }: RemoveTracksProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, { url: "/me/tracks", data: { ids }, method: "DELETE" });
    });
};
