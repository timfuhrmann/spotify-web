import { request } from "@lib/api";

export type AlbumGroup = "album" | "single" | "compilation" | "appears_on";

export const getArtist = async (
    access_token: string | null,
    id: string | null | undefined
): Promise<SpotifyApi.ArtistObjectFull | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, { url: "/artists/" + id });
};

export const getArtistsTopTracks = async (
    access_token: string | null,
    id: string | null | undefined
): Promise<SpotifyApi.TrackObjectFull[] | undefined> => {
    if (!access_token || !id) {
        return;
    }

    const { tracks } = await request<SpotifyApi.ArtistsTopTracksResponse>(access_token, {
        url: "/artists/" + id + "/top-tracks",
        params: { market: "US" },
    });

    return tracks;
};

export const getArtistsAlbums = async (
    access_token: string | null,
    id: string | null | undefined,
    include_groups: AlbumGroup[] = ["album", "single", "compilation"]
): Promise<SpotifyApi.ArtistsAlbumsResponse | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request<SpotifyApi.ArtistsAlbumsResponse>(access_token, {
        url: "/artists/" + id + "/albums",
        params: { include_groups: include_groups.join(",") },
    });
};

export const getArtistsRelatedArtists = async (
    access_token: string | null,
    id: string | null | undefined
): Promise<SpotifyApi.ArtistsRelatedArtistsResponse | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request<SpotifyApi.ArtistsRelatedArtistsResponse>(access_token, {
        url: "/artists/" + id + "/related-artists",
    });
};
