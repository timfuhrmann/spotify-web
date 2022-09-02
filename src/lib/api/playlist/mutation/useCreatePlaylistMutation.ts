import { useMutation } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";

export const useCreatePlaylistMutation = () => {
    const { push } = useRouter();
    const { access_token, session } = useSession();
    const { data: rootPlaylists } = useRootPlaylistsQuery();

    return useMutation<SpotifyApi.PlaylistObjectFull | undefined>(
        async () => {
            if (!access_token || !session || !rootPlaylists) {
                return;
            }

            const ownedPlaylists = rootPlaylists.filter(
                playlist => playlist.owner.id === session.id
            );

            return request(access_token, {
                url: "/users/" + session.id + "/playlists",
                method: "POST",
                data: { name: "My Playlist Nr. " + (ownedPlaylists.length + 1) },
            });
        },
        {
            onSuccess: async data => {
                await queryClient.refetchQueries(["root-playlists"]);
                enqueueSnackbar("Playlist created");

                if (data) {
                    push("/playlist/" + data.id);
                }
            },
        }
    );
};
