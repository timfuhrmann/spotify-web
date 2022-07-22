import { request } from "@lib/api";

export const ALBUM_TRACKS_OFFSET = 50;

export const getAlbum = async (
    access_token: string | null,
    id: string | null
): Promise<SpotifyApi.AlbumObjectFull | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, { url: "/albums/" + id });
};

export const getAlbumTracks = async (
    access_token: string | null,
    id: string | null,
    page: number = 0
): Promise<SpotifyApi.AlbumTracksResponse | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, {
        url: "/albums/" + id + "/tracks",
        params: { offset: page * ALBUM_TRACKS_OFFSET, limit: ALBUM_TRACKS_OFFSET },
    });
};

export const getSavedAlbumsContains = async (
    access_token: string | null,
    ids: string[] | null
): Promise<boolean[] | undefined> => {
    if (!access_token || !ids) {
        return;
    }

    return request(access_token, {
        url: "/me/albums/contains",
        params: { ids: ids.join(",") },
    });
};

export const saveAlbum = async (access_token: string | null, ids: string[]): Promise<void> => {
    if (!access_token) {
        return;
    }

    return request(access_token, { url: "/me/albums", data: { ids }, method: "PUT" });
};

export const removeAlbum = async (access_token: string | null, ids: string[]): Promise<void> => {
    if (!access_token) {
        return;
    }

    return request(access_token, { url: "/me/albums", data: { ids }, method: "DELETE" });
};
