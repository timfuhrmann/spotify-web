import { request } from "@lib/api";

export const getCurrentUser = async (
    access_token: string
): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
    return request(access_token, { url: "/me" });
};
