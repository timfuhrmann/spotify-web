import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";

export const usePlaybackPauseMutation = () => {
    const { access_token } = useSession();
    const { activeDevice, device_id: playerDeviceId } = usePlayer();

    const device_id =
        activeDevice && activeDevice.id !== playerDeviceId ? activeDevice.id : playerDeviceId;

    return useMutation(
        ["playback-pause", access_token],
        async () => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/pause",
                params: { device_id },
                method: "PUT",
            });
        },
        {
            retry: 1,
            onSettled: () => {
                if (device_id !== playerDeviceId) {
                    queryClient.invalidateQueries(["playback-state"]);
                }
            },
        }
    );
};
