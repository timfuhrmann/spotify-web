import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface SaveTracksProps {
    ids: string[];
}

export const useSaveTracksMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ ids }: SaveTracksProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, { url: "/me/tracks", data: { ids }, method: "PUT" });
    });
};
