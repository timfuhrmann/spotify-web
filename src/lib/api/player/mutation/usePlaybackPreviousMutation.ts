import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";

export const usePlaybackPreviousMutation = () => {
    const { access_token } = useSession();
    const { targetDeviceId, device_id } = usePlayer();

    return useMutation(
        async () => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/previous",
                params: { device_id: targetDeviceId },
                method: "POST",
            });
        },
        {
            onSettled: () => {
                if (targetDeviceId !== device_id) {
                    queryClient.refetchQueries(["playback-state"]);
                }
            },
        }
    );
};
