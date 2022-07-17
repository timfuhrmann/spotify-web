import { request } from "@lib/api";

export const getArtist = async (
    access_token: string | null,
    id: string | null
): Promise<SpotifyApi.ArtistObjectFull | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, { url: "/artists/" + id });
};
