import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { ArtistProps } from "./Artist";
import { useSession } from "@lib/context/session";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useSavedTracksContains } from "@lib/hook/useSavedTracksContains";
import { useArtistsAlbums } from "@lib/api/hook/useArtistsAlbums";
import { useArtistsRelatedArtists } from "@lib/api/hook/useArtistsRelatedArtists";

interface ArtistContextData {
    savedTracks: boolean[];
    albums: SpotifyApi.AlbumObjectSimplified[] | null;
    appearsOn: SpotifyApi.AlbumObjectSimplified[] | null;
    relatedArtists: SpotifyApi.ArtistObjectFull[] | null;
    popularTracksLength: number;
    hasMorePopularTracks: boolean;
    hasLessPopularTracks: boolean;
    showMorePopularTracks: () => void;
    showLessPopularTracks: () => void;
    handleSaveTrack: (id: string, index: number) => Promise<void>;
    handleRemoveTrack: (id: string, index: number) => Promise<void>;
}

const ArtistContext = createContext<ArtistContextData>({} as ArtistContextData);

export const ArtistProvider: React.FC<PropsWithChildren<ArtistProps>> = ({
    artist,
    topTracks,
    children,
}) => {
    const { access_token } = useSession();
    const [popularTracksLength, setPopularTracksLength] = useState(Math.min(5, topTracks.length));

    const {
        data: savedTracks = [],
        saveTrackToCache,
        removeTrackFromCache,
    } = useSavedTracksContains(
        artist.id,
        topTracks.map(track => track.id)
    );

    const { data: artistAlbums } = useArtistsAlbums(artist.id);

    const { data: artistAppearsOn } = useArtistsAlbums(artist.id, ["appears_on"]);

    const { data: artistRelatedArtists } = useArtistsRelatedArtists(artist.id);

    const hasMorePopularTracks = length < topTracks.length;
    const hasLessPopularTracks = length > Math.min(5, topTracks.length);

    const showMorePopularTracks = () => {
        setPopularTracksLength(topTracks.length);
    };

    const showLessPopularTracks = () => {
        setPopularTracksLength(Math.min(5, topTracks.length));
    };

    const handleSaveTrack = async (id: string, index: number): Promise<void> => {
        saveTrackToCache(index);
        return saveTracks(access_token, [id]);
    };

    const handleRemoveTrack = async (id: string, index: number): Promise<void> => {
        removeTrackFromCache(index);
        return removeTracks(access_token, [id]);
    };

    return (
        <ArtistContext.Provider
            value={{
                savedTracks,
                albums: artistAlbums ? artistAlbums.items : null,
                appearsOn: artistAppearsOn ? artistAppearsOn.items : null,
                relatedArtists: artistRelatedArtists ? artistRelatedArtists.artists : null,
                popularTracksLength,
                hasMorePopularTracks,
                hasLessPopularTracks,
                showMorePopularTracks,
                showLessPopularTracks,
                handleSaveTrack,
                handleRemoveTrack,
            }}>
            {children}
        </ArtistContext.Provider>
    );
};

export const useArtist = () => useContext(ArtistContext);
