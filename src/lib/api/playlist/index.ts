import { request } from "@lib/api";

export const PLAYLIST_TRACKS_OFFSET = 100;

export const getRootPlaylists = async (
    access_token: string
): Promise<SpotifyApi.PlaylistObjectSimplified[] | undefined> => {
    const { items } = await request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(access_token, {
        url: "/me/playlists",
        params: { limit: 50 },
    });

    return items;
};

export const getPlaylist = async (
    access_token: string,
    id: string
): Promise<SpotifyApi.PlaylistObjectFull | undefined> => {
    return request(access_token, { url: "/playlists/" + id });
};

export const getPlaylistTracks = async (
    access_token: string,
    id: string,
    page: number = 0
): Promise<SpotifyApi.PlaylistTrackResponse | undefined> => {
    return request(access_token, {
        url: "/playlists/" + id + "/tracks",
        params: { offset: page * PLAYLIST_TRACKS_OFFSET, limit: PLAYLIST_TRACKS_OFFSET },
    });
};

export const followPlaylist = async (access_token: string, id: string): Promise<void> => {
    return request(access_token, { url: "/playlists/" + id + "/followers", method: "PUT" });
};

export const unfollowPlaylist = async (access_token: string, id: string): Promise<void> => {
    return request(access_token, { url: "/playlists/" + id + "/followers", method: "DELETE" });
};

export const getFeaturedPlaylists = async (
    access_token: string,
    limit: number = 20
): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse | undefined> => {
    return request(access_token, {
        url: "/browse/featured-playlists",
        params: { country: "US", locale: "en-US", limit },
    });
};
