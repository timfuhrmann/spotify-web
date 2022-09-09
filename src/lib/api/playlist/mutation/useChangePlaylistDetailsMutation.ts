import { useMutation } from "react-query";
import { useSession } from "@lib/context/session";
import { queryClient, request } from "@lib/api";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";

interface PlaylistDetailsProps {
    name: string;
    description?: string;
}

export const useChangePlaylistDetailsMutation = (id: string) => {
    const { access_token, session } = useSession();
    const { data: rootPlaylists } = useRootPlaylistsQuery();

    return useMutation(
        async ({ name, description }: PlaylistDetailsProps) => {
            if (!access_token || !session || !rootPlaylists) {
                return;
            }

            return request(access_token, {
                url: "/playlists/" + id,
                method: "PUT",
                data: { name, description },
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: ({ queryKey }) =>
                        queryKey.includes(id) || queryKey.includes("root-playlists"),
                });
            },
        }
    );
};
