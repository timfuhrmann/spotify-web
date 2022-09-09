import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { enqueueSnackbar } from "notistack";

interface RemoveTracksProps {
    ids: string[];
}

export const useRemoveTracksMutation = () => {
    const { access_token } = useSession();

    return useMutation(
        async ({ ids }: RemoveTracksProps) => {
            if (!access_token) {
                return;
            }

            return request(access_token, { url: "/me/tracks", data: { ids }, method: "DELETE" });
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["saved-tracks"]);

                enqueueSnackbar("Removed from tracks");
            },
            onError: () => {
                enqueueSnackbar("Couldn't remove from tracks");
            },
        }
    );
};
