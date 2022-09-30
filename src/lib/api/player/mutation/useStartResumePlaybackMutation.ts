import { useMutation } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";
import { usePlayer } from "@lib/player";
import { useAppDispatch } from "@lib/redux";
import { setCurrentContext } from "@lib/redux/reducer/player";

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

export const useStartResumePlaybackMutation = (considerTargetDevice?: boolean) => {
    const dispatch = useAppDispatch();
    const { access_token } = useSession();
    const { player, targetDeviceId, device_id } = usePlayer();

    return useMutation(
        async ({ uris, context_uri, offset, position_ms }: StartResumePlaybackProps) => {
            if (!access_token || !player) {
                return;
            }

            dispatch(setCurrentContext(context_uri ? context_uri : null));

            // @ts-ignore
            player.activateElement();

            return request(access_token, {
                url: "/me/player/play",
                // force playback on this device, because of issues keeping the state up-to-date with spotify connect
                params: { device_id: considerTargetDevice ? targetDeviceId : device_id },
                data: { context_uri, uris, offset, position_ms },
                method: "PUT",
            });
        },
        {
            onSettled: () => {
                if (targetDeviceId !== device_id) {
                    setTimeout(() => {
                        queryClient.refetchQueries({
                            predicate: ({ queryKey }) =>
                                queryKey.includes("devices") || queryKey.includes("playback-state"),
                        });
                    }, 1000);
                }
            },
        }
    );
};
