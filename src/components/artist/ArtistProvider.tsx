import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { ArtistProps } from "./Artist";
import { useSession } from "@lib/context/session";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useSavedTracksContainsQuery } from "@lib/api/hook/useSavedTracksContainsQuery";
import { useArtistsAlbumsQuery } from "@lib/api/hook/useArtistsAlbumsQuery";
import { useArtistsRelatedArtistsQuery } from "@lib/api/hook/useArtistsRelatedArtistsQuery";

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
    } = useSavedTracksContainsQuery(topTracks.map(track => track.id));
    const { data: artistAlbums } = useArtistsAlbumsQuery(artist.id);
    const { data: artistAppearsOn } = useArtistsAlbumsQuery(artist.id, ["appears_on"]);
    const { data: artistRelatedArtists } = useArtistsRelatedArtistsQuery(artist.id);

    const hasMorePopularTracks = popularTracksLength < topTracks.length;
    const hasLessPopularTracks = popularTracksLength > Math.min(5, topTracks.length);

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
