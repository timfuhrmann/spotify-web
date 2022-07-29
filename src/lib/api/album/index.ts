import { request } from "@lib/api";

export enum AlbumGroup {
    Album = "album",
    Single = "single",
    AppearsOn = "appears_on",
    Compilation = "compilation",
}

export const ALBUM_TRACKS_OFFSET = 50;

export const getAlbum = async (
    access_token: string,
    id: string
): Promise<SpotifyApi.AlbumObjectFull | undefined> => {
    return request(access_token, { url: "/albums/" + id });
};

export const getAlbumTracks = async (
    access_token: string,
    id: string,
    page: number = 0
): Promise<SpotifyApi.AlbumTracksResponse | undefined> => {
    return request(access_token, {
        url: "/albums/" + id + "/tracks",
        params: { offset: page * ALBUM_TRACKS_OFFSET, limit: ALBUM_TRACKS_OFFSET },
    });
};

export const getSavedAlbums = async (
    access_token: string
): Promise<SpotifyApi.UsersSavedAlbumsResponse | undefined> => {
    return request(access_token, { url: "/me/albums" });
};

export const getSavedAlbumsContains = async (
    access_token: string,
    ids: string[]
): Promise<boolean[] | undefined> => {
    return request(access_token, {
        url: "/me/albums/contains",
        params: { ids: ids.join(",") },
    });
};

export const saveAlbum = async (access_token: string, ids: string[]): Promise<void> => {
    return request(access_token, { url: "/me/albums", data: { ids }, method: "PUT" });
};

export const removeAlbum = async (access_token: string, ids: string[]): Promise<void> => {
    return request(access_token, { url: "/me/albums", data: { ids }, method: "DELETE" });
};

export const getNewReleases = async (
    access_token: string,
    limit: number = 20
): Promise<SpotifyApi.ListOfNewReleasesResponse> => {
    return request(access_token, { url: "/browse/new-releases", params: { limit } });
};
