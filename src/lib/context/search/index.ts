import { createContext, useContext } from "react";

interface SearchContextData {
    isLoading: boolean;
    typesFound: string[];
    topArtist: SpotifyApi.ArtistObjectFull | null;
    playlists: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> | undefined;
    albums: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | undefined;
    tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined;
    artists: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined;
}

export const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export const useSearch = () => useContext(SearchContext);
