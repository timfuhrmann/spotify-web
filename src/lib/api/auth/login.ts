import { configSpotify, SPOTIFY_SCOPES } from "@lib/api/auth";
import { getAppUrl } from "@lib/util";

const appUrl = getAppUrl();

export const getSpotifyLoginUrl = (): string => {
    return `https://accounts.spotify.com/authorize?client_id=${configSpotify.clientId}&response_type=code&redirect_uri=${appUrl}/api/auth/callback&scope=${SPOTIFY_SCOPES}`;
};
