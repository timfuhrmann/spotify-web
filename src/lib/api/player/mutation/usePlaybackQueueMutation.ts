import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";
import { enqueueSnackbar } from "notistack";

interface PlaybackQueueProps {
    uri: string;
}

export const usePlaybackQueueMutation = () => {
    const { access_token } = useSession();
    const { targetDeviceId } = usePlayer();

    return useMutation(
        async ({ uri }: PlaybackQueueProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/queue",
                params: { device_id: targetDeviceId, uri },
                method: "POST",
            });
        },
        {
            onSuccess: () => {
                enqueueSnackbar("Added to queue");
            },
            onError: () => {
                enqueueSnackbar("Couldn't add to queue");
            },
        }
    );
};
