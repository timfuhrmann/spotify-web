import axios from "axios";

export interface SpotifyAuth {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export const getSpotifyToken = async (
    params: Record<string, string> = { grant_type: "client_credentials" }
) => {
    const { data } = await axios.post<SpotifyAuth>("https://accounts.spotify.com/api/token", null, {
        params,
        headers: {
            Authorization: SPOTIFY_AUTHORIZATION,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return data;
};

export const configSpotify = {
    host: "https://api.spotify.com/v1",
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

export const SPOTIFY_SCOPES =
    "streaming user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read";

const SPOTIFY_AUTHORIZATION =
    "Basic " + btoa(configSpotify.clientId + ":" + configSpotify.clientSecret);
