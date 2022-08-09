import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";

interface FollowPlaylistProps {
    id: string;
}

export const useUnfollowPlaylistMutation = () => {
    const { access_token } = useSession();

    return useMutation(async ({ id }: FollowPlaylistProps) => {
        if (!access_token) {
            return;
        }

        return request(access_token, { url: "/playlists/" + id + "/followers", method: "DELETE" });
    });
};
