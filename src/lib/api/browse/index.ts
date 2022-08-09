import { request } from "@lib/api";
import { BrowseType, BrowseTypeType } from "@type/browse";

export const searchByType = async (
    access_token: string,
    query: string,
    type: BrowseTypeType[] = [
        BrowseType.Track,
        BrowseType.Album,
        BrowseType.Playlist,
        BrowseType.Artist,
    ],
    limit: number = 49
): Promise<SpotifyApi.SearchResponse> => {
    return request(access_token, {
        url: "/search",
        params: { q: query, type: type.join(","), country: "US", locale: "en-US", limit },
    });
};
