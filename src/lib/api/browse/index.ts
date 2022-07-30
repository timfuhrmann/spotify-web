import { request } from "@lib/api";

export enum BrowseType {
    Album = "album",
    Playlist = "playlist",
    Track = "track",
    Artist = "artist",
}

export type BrowseTypeType = `${BrowseType}`;

export const searchByType = async (
    access_token: string,
    query: string,
    type: BrowseTypeType[],
    limit: number = 49
): Promise<SpotifyApi.SearchResponse> => {
    return request(access_token, {
        url: "/search",
        params: { q: query, type: type.join(","), country: "US", locale: "en-US", limit },
    });
};

export const getCategory = async (
    access_token: string,
    id: string
): Promise<SpotifyApi.SingleCategoryResponse> => {
    return request(access_token, {
        url: "/browse/categories/" + id,
        params: { country: "US", locale: "en-US" },
    });
};

export const getMultipleCategories = async (
    access_token: string,
    limit: number = 49
): Promise<SpotifyApi.MultipleCategoriesResponse> => {
    return request(access_token, {
        url: "/browse/categories",
        params: { limit, country: "US", locale: "en-US" },
    });
};

export const getCategoriesPlaylists = async (
    access_token: string,
    id: string,
    limit: number = 49
): Promise<SpotifyApi.CategoryPlaylistsResponse> => {
    return request(access_token, {
        url: "/browse/categories/" + id + "/playlists",
        params: { limit, country: "US", locale: "en-US" },
    });
};
