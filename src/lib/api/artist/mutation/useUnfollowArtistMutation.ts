import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface UnfollowArtistProps {
    ids: string[];
}

export const useUnfollowArtistMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ ids }: UnfollowArtistProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, {
            url: "/me/following",
            params: { type: "artist" },
            data: { ids },
            method: "DELETE",
        });
    });
};
