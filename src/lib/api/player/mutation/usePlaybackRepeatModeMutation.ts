import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";
import { RepeatMode } from "@lib/redux/reducer/player";

interface RepeatModeProps {
    state: RepeatMode;
}

export const usePlaybackRepeatModeMutation = () => {
    const { access_token } = useSession();
    const { targetDeviceId } = usePlayer();

    return useMutation(
        async ({ state }: RepeatModeProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/repeat",
                params: { device_id: targetDeviceId, state },
                method: "PUT",
            });
        },
        {
            retry: 1,
            onSettled: () => {
                queryClient.refetchQueries(["playback-state"]);
            },
        }
    );
};
