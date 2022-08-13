import { useMutation } from "react-query";
import { queryClient, request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { enqueueSnackbar } from "notistack";

interface RemoveTracksFromPlaylist {
    playlistId: string;
    uris: string[];
}

export const useRemoveTracksFromPlaylistMutation = () => {
    const { access_token } = useSession();

    return useMutation(
        async ({ playlistId, uris }: RemoveTracksFromPlaylist) => {
            if (!access_token) {
                return;
            }

            return request(access_token!, {
                url: `/playlists/${playlistId}/tracks`,
                data: { uris },
                method: "DELETE",
            });
        },
        {
            onSuccess: (_, { playlistId }) => {
                enqueueSnackbar("Removed from playlist");

                queryClient.invalidateQueries({
                    predicate: ({ queryKey }) => queryKey.includes(playlistId),
                });
            },
            onError: () => {
                enqueueSnackbar("Couldn't remove from playlist");
            },
        }
    );
};
