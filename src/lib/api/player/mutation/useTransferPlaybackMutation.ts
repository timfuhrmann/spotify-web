import cloneDeep from "lodash.clonedeep";
import { useSession } from "@lib/context/session";
import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";

interface TransferPlaybackProps {
    device_ids: string[];
}

export const useTransferPlaybackMutation = () => {
    const { access_token } = useSession();

    //@todo cant assign to own device when not playing
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
                    data => {
                        if (!data) {
                            return;
                        }

                        const newData = cloneDeep(data);
                        newData.devices = newData.devices.map(device => ({
                            ...device,
                            is_active: false,
                        }));

                        const index = newData.devices.findIndex(
                            device => device.id && device_ids.includes(device.id)
                        );

                        if (index > -1) {
                            newData.devices[index].is_active = true;
                        }

                        return newData;
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
