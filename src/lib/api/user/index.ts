import { request } from "@lib/api";

export const getCurrentUser = async (
    access_token: string
): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
    return request(access_token, { url: "/me" });
};

export const getUsersTopArtists = async (
    access_token: string,
    limit: number = 20
): Promise<SpotifyApi.UsersTopArtistsResponse> => {
    return request(access_token, { url: "/me/top/artists", params: { limit } });
};
