import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";
import { RepeatMode as RepeatModeType } from "@lib/redux/reducer/player/index";

interface PlaybackShuffleProps {
    state: boolean;
}

export const usePlaybackShuffleMutation = () => {
    const { access_token } = useSession();
    const { targetDeviceId } = usePlayer();

    return useMutation(
        ["playback-shuffle", access_token],
        async ({ state }: PlaybackShuffleProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player/shuffle",
                params: { device_id: targetDeviceId, state },
                method: "PUT",
            });
        },
        {
            retry: 1,
            onSettled: () => {
                queryClient.invalidateQueries(["playback-state"]);
            },
        }
    );
};
