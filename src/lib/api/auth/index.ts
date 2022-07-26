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
    return fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams(params),
        headers: {
            Authorization: SPOTIFY_AUTHORIZATION,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then(res => res.json())
        .catch(console.error);
};

export const configSpotify = {
    host: "https://api.spotify.com/v1",
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

export const SPOTIFY_SCOPES =
    "streaming user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-follow-modify user-follow-read";

const SPOTIFY_AUTHORIZATION =
    "Basic " + btoa(configSpotify.clientId + ":" + configSpotify.clientSecret);
