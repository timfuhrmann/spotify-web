import { request } from "@lib/api";

export const PLAYLIST_TRACKS_OFFSET = 100;

export const getRootPlaylists = async (
    access_token: string | null
): Promise<SpotifyApi.PlaylistObjectSimplified[] | undefined> => {
    if (!access_token) {
        return;
    }

    const { items } = await request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(access_token, {
        url: "/me/playlists",
    });

    return items;
};

export const getPlaylist = async (
    access_token: string | null,
    id: string | null | undefined
): Promise<SpotifyApi.PlaylistObjectFull | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, { url: "/playlists/" + id });
};

export const getPlaylistTracks = async (
    access_token: string | null,
    id: string | null | undefined,
    page: number = 0
): Promise<SpotifyApi.PlaylistTrackResponse | undefined> => {
    if (!access_token || !id) {
        return;
    }

    return request(access_token, {
        url: "/playlists/" + id + "/tracks",
        params: { offset: page * PLAYLIST_TRACKS_OFFSET, limit: PLAYLIST_TRACKS_OFFSET },
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
