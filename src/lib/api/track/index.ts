import { request } from "@lib/api";

const SAVED_TRACKS_OFFSET = 50;

export const getSavedTracks = async (
    access_token: string,
    page = 0
): Promise<SpotifyApi.UsersSavedTracksResponse | undefined> => {
    return request(access_token, {
        url: "/me/tracks",
        params: { offset: page * SAVED_TRACKS_OFFSET, limit: SAVED_TRACKS_OFFSET },
    });
};

export const getSavedTracksContains = async (
    access_token: string,
    ids: string[]
): Promise<boolean[] | undefined> => {
    return request(access_token, {
        url: "/me/tracks/contains",
        params: { ids: ids.join(",") },
    });
};

export const saveTracks = async (access_token: string, ids: string[]): Promise<void> => {
    return request(access_token, { url: "/me/tracks", data: { ids }, method: "PUT" });
};

export const removeTracks = async (access_token: string, ids: string[]): Promise<void> => {
    return request(access_token, { url: "/me/tracks", data: { ids }, method: "DELETE" });
};
