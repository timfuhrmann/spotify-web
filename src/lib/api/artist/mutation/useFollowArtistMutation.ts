import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface FollowArtistProps {
    ids: string[];
}

export const useFollowArtistMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ ids }: FollowArtistProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, {
            url: "/me/following",
            params: { type: "artist" },
            data: { ids },
            method: "PUT",
        });
    });
};
