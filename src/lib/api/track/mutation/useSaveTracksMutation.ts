import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { enqueueSnackbar } from "notistack";

interface SaveTracksProps {
    ids: string[];
}

export const useSaveTracksMutation = () => {
    const { access_token } = useSession();

    return useMutation(
        async ({ ids }: SaveTracksProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, { url: "/me/tracks", data: { ids }, method: "PUT" });
        },
        {
            onSuccess: () => {
                enqueueSnackbar("Saved to tracks");
            },
            onError: () => {
                enqueueSnackbar("Couldn't save to tracks");
            },
        }
    );
};
