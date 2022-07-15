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
