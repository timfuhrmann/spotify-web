import { request } from "@lib/api";

export const getPlaylist = async (
    access_token: string | null,
    id: string | null
): Promise<SpotifyApi.PlaylistObjectFull | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, { url: "/playlists/" + id });
};

export const getPlaylists = async (
    access_token: string | null
): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | undefined> => {
    if (!access_token) {
        return;
    }

    return request(access_token, { url: "/me/playlists" });
};

export const getPlaylistTracks = async (
    access_token: string | null,
    id: string | null,
    page: number
): Promise<SpotifyApi.PlaylistTrackResponse | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, {
        url: "/playlists/" + id + "/tracks",
        params: { offset: page * 50, limit: 50 },
    });
};

export const followPlaylist = async (access_token: string | null, id: string): Promise<void> => {
    if (!access_token) {
        return;
    }

    return request(access_token, { url: "/playlists/" + id + "/followers", method: "PUT" });
};

export const unfollowPlaylist = async (access_token: string | null, id: string): Promise<void> => {
    if (!access_token) {
        return;
    }

    return request(access_token, { url: "/playlists/" + id + "/followers", method: "DELETE" });
};
