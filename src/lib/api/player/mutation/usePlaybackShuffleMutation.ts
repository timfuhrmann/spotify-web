import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { usePlayer } from "@lib/player";

interface PlaybackShuffleProps {
    state: boolean;
}

export const usePlaybackShuffleMutation = () => {
    const { access_token } = useSession();
    const { targetDeviceId } = usePlayer();

    return useMutation(
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
                queryClient.refetchQueries(["playback-state"]);
            },
        }
    );
};
