import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchByType } from "@lib/api/browse";
import { objectKeys } from "@lib/util";
import { SearchOverviewTopResultProps } from "../../../../components/search/SearchOverview/SearchOverviewTopResult";

interface BrowseState {
    loading: boolean;
    types: string[];
    topArtist: SearchOverviewTopResultProps | null;
    playlists: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> | null;
    albums: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | null;
    tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | null;
    artists: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | null;
}

interface ThunkParams {
    query: string;
    access_token: string;
}

export const searchByTypeThunk = createAsyncThunk<SpotifyApi.SearchResponse, ThunkParams>(
    "search/searchByType",
    async ({ query, access_token }) => {
        return searchByType(access_token, query);
    }
);

const initialState: BrowseState = {
    loading: true,
    types: ["albums", "artists", "playlists"],
    topArtist: null,
    playlists: null,
    albums: null,
    tracks: null,
    artists: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetSearch: state => {
            state.loading = true;
            state.topArtist = null;
            state.playlists = null;
            state.albums = null;
            state.tracks = null;
            state.artists = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(searchByTypeThunk.pending, state => {
            state.loading = true;
        });

        builder.addCase(searchByTypeThunk.fulfilled, (state, action) => {
            const { playlists, artists, tracks, albums } = action.payload;

            state.loading = false;
            state.tracks = tracks && tracks.items.length > 0 ? tracks : null;
            state.artists = artists && artists.items.length > 0 ? artists : null;
            state.albums = albums && albums.items.length > 0 ? albums : null;
            state.playlists = playlists && playlists.items.length > 0 ? playlists : null;

            state.types = objectKeys(action.payload)
                .filter(type => {
                    if (type === "tracks") {
                        return false;
                    }

                    const result = action.payload[type];
                    return result && result.items.length > 0;
                })
                .sort((a, b) => a.localeCompare(b));

            //@todo use any result
            if (artists && artists.items.length > 0) {
                state.topArtist = artists.items[0];
            }
        });
    },
});

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
