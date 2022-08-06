import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";

export const usePlaybackNext = () => {
    const { access_token } = useSession();
    const { targetDeviceId, device_id } = usePlayer();

    return useMutation(
        ["playback-next", access_token],
        async () => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/next",
                params: { device_id: targetDeviceId },
                method: "POST",
            });
        },
        {
            retry: 1,
            onSettled: () => {
                if (targetDeviceId !== device_id) {
                    queryClient.invalidateQueries(["playback-state"]);
                }
            },
        }
    );
};
