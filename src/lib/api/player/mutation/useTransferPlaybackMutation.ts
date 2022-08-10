import { useSession } from "@lib/context/session";
import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";

interface TransferPlaybackProps {
    device_ids: string[];
}

export const useTransferPlaybackMutation = () => {
    const { access_token } = useSession();

    return useMutation(
        async ({ device_ids }: TransferPlaybackProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, {
                url: "/me/player",
                data: { device_ids },
                method: "PUT",
            });
        },
        {
            onSuccess: (_, { device_ids }) => {
                queryClient.setQueryData<SpotifyApi.UserDevicesResponse | undefined>(
                    ["devices", access_token],
                    cachedData => {
                        if (!cachedData) {
                            return;
                        }

                        return {
                            devices: cachedData.devices.map(device => {
                                return {
                                    ...device,
                                    is_active: !!device.id && device_ids.includes(device.id),
                                };
                            }),
                        };
                    }
                );
            },
            onSettled: () => {
                queryClient.refetchQueries(["playback-state"]);

                setTimeout(() => {
                    queryClient.refetchQueries(["devices"]);
                }, 1000);
            },
        }
    );
};
