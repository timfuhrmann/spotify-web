import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";

interface PlaybackQueueProps {
    uri: string;
}

export const usePlaybackQueueMutation = () => {
    const { access_token } = useSession();
    const { device_id } = usePlayer();

    return useMutation(
        ["playback-queue", access_token],
        async ({ uri }: PlaybackQueueProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/queue",
                params: { device_id, uri },
                method: "POST",
            });
        },
        {
            retry: 1,
        }
    );
};
