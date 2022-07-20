import { getSpotifyToken } from "@lib/api/auth";
import { getAppUrl } from "@lib/util";

const appUrl = getAppUrl();

export const getSpotifyAccessToken = async (code: string) => {
    return getSpotifyToken({
        grant_type: "authorization_code",
        redirect_uri: appUrl + "/api/auth/callback",
        code,
    });
};

export const getRefreshedSpotifyAccessToken = async (refresh_token: string) => {
    return getSpotifyToken({
        grant_type: "refresh_token",
        refresh_token,
    });
};
