import { request } from "@lib/api";

export const getSavedTracksContains = async (
    access_token: string | null,
    ids: string[] | null
): Promise<boolean[] | undefined> => {
    if (!access_token || !ids) {
        return;
    }

    return request(access_token, {
        url: "/me/tracks/contains",
        params: { ids: ids.join(",") },
    });
};

export const saveTracks = async (
    access_token: string | null,
    ids: string[] | null
): Promise<string[] | undefined> => {
    if (!access_token || !ids) {
        return;
    }

    return request(access_token, { url: "/me/tracks", data: { ids: ids }, method: "PUT" });
};

export const removeTracks = async (
    access_token: string | null,
    ids: string[] | null
): Promise<string[] | undefined> => {
    if (!access_token || !ids) {
        return;
    }

    return request(access_token, { url: "/me/tracks", data: { ids: ids }, method: "DELETE" });
};
