import { useMutation } from "react-query";
import { request } from "@lib/api";
import { useSession } from "@lib/context/session";
import { enqueueSnackbar } from "notistack";

interface AddTrackToPlaylist {
    playlistId: string;
    uris: string[];
}

export const useAddTracksToPlaylistMutation = () => {
    const { access_token } = useSession();

    return useMutation(
        async ({ playlistId, uris }: AddTrackToPlaylist) => {
            if (!access_token) {
                return;
            }

            return request(access_token!, {
                url: `/playlists/${playlistId}/tracks`,
                params: { uris: uris.join(",") },
                method: "POST",
            });
        },
        {
            retry: 1,
            onSuccess: () => {
                enqueueSnackbar("Added to playlist");
            },
            onError: () => {
                enqueueSnackbar("Couldn't add to playlist");
            },
        }
    );
};
