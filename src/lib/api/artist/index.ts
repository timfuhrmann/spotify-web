import { request } from "@lib/api";

export const ALBUM_TRACKS_OFFSET = 50;

export const ALBUM_GROUPS = ["album", "single", "appears_on", "compilation"];

export const isAlbumGroup = (group: string): group is AlbumGroup => {
    return ALBUM_GROUPS.includes(group);
};

export type AlbumGroup = "album" | "single" | "appears_on" | "compilation";

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
        params: { include_groups: include_groups.join(","), limit: ALBUM_TRACKS_OFFSET },
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

export const getFollowedArtistsContains = async (
    access_token: string | null,
    ids: string[] | null
): Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse | undefined> => {
    if (!access_token || !ids) {
        return;
    }

    return request<SpotifyApi.UserFollowsUsersOrArtistsResponse>(access_token, {
        url: "/me/following/contains",
        params: { type: "artist", ids: ids.join(",") },
    });
};

export const followArtist = async (access_token: string | null, ids: string[]): Promise<void> => {
    if (!access_token) {
        return;
    }

    return request(access_token, {
        url: "/me/following",
        params: { type: "artist" },
        data: { ids },
        method: "PUT",
    });
};

export const unfollowArtist = async (access_token: string | null, ids: string[]): Promise<void> => {
    if (!access_token) {
        return;
    }

    return request(access_token, {
        url: "/me/following",
        params: { type: "artist" },
        data: { ids },
        method: "DELETE",
    });
};
