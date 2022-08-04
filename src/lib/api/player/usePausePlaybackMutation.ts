import { useMutation } from "react-query";
import { useSession } from "@lib/context/session";
import { request } from "@lib/api";
import { usePlayer } from "@lib/player";

export const usePausePlaybackMutation = () => {
    const { access_token } = useSession();
    const { device_id } = usePlayer();

    return useMutation(["pause-playback", access_token], async () => {
        if (!access_token || !device_id) {
            return;
        }
        return request(access_token, {
            url: "/me/player/pause",
            params: { device_id },
            method: "PUT",
        });
    });
};
