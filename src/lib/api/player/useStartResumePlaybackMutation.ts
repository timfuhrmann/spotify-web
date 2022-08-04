import { useMutation } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";
import { usePlayer } from "@lib/player";

interface Position {
    uri?: string;
    position?: number;
}

interface StartResumePlaybackProps {
    context_uri?: string;
    uris?: string[];
    offset?: Position;
    position_ms?: number;
}

export const useStartResumePlaybackMutation = () => {
    const { access_token } = useSession();
    const { player, device_id } = usePlayer();

    return useMutation(
        ["start-resume-playback", access_token],
        async ({ uris, context_uri, offset, position_ms }: StartResumePlaybackProps) => {
            if (!access_token || !device_id || !player) {
                return;
            }

            // @ts-ignore
            player.activateElement();

            return request(access_token, {
                url: "/me/player/play",
                params: { device_id },
                data: { context_uri, uris, offset, position_ms },
                method: "PUT",
            });
        },
        {
            retry: 1,
        }
    );
};
