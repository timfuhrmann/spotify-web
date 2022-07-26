import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { ArtistProps } from "./Artist";
import { useSession } from "@lib/context/session";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useSavedTracksContainsQuery } from "@lib/api/hook/useSavedTracksContainsQuery";
import { useArtistsAlbumsQuery } from "@lib/api/hook/useArtistsAlbumsQuery";
import { useArtistsRelatedArtistsQuery } from "@lib/api/hook/useArtistsRelatedArtistsQuery";
import { AlbumGroup, followArtist, unfollowArtist } from "@lib/api/artist";
import { useFollowedArtistsContains } from "@lib/api/hook/useFollowedArtistOrUser";

interface ArtistContextData {
    isFollowing: boolean;
    savedTracks: boolean[];
    albumGroup: AlbumGroup | null;
    albumGroups: AlbumGroup[] | null;
    albums: SpotifyApi.AlbumObjectSimplified[] | null;
    appearsOn: SpotifyApi.AlbumObjectSimplified[] | null;
    relatedArtists: SpotifyApi.ArtistObjectFull[] | null;
    popularTracksLength: number;
    hasMorePopularTracks: boolean;
    hasLessPopularTracks: boolean;
    setAlbumGroup: (albumGroup: AlbumGroup | null) => void;
    showMorePopularTracks: () => void;
    showLessPopularTracks: () => void;
    handleSaveTrack: (id: string, index: number) => Promise<void>;
    handleRemoveTrack: (id: string, index: number) => Promise<void>;
    handleFollowArtist: () => Promise<void>;
    handleUnfollowArtist: () => Promise<void>;
}

const ArtistContext = createContext<ArtistContextData>({} as ArtistContextData);

export const ArtistProvider: React.FC<PropsWithChildren<ArtistProps>> = ({
    artist,
    topTracks,
    children,
}) => {
    const { access_token } = useSession();
    const [albumGroup, setAlbumGroup] = useState<AlbumGroup | null>(null);
    const [popularTracksLength, setPopularTracksLength] = useState(Math.min(5, topTracks.length));

    const {
        data: followedArtists = [],
        saveArtistToCache,
        removeArtistFromCache,
    } = useFollowedArtistsContains([artist.id]);
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

    const albums = useMemo(() => {
        if (!artistAlbums) {
            return null;
        }

        if (!albumGroup) {
            return artistAlbums.items;
        }

        return artistAlbums.items.filter(album => album.album_group === albumGroup);
    }, [artistAlbums, albumGroup]);

    const albumGroups = useMemo<AlbumGroup[] | null>(() => {
        if (!artistAlbums) {
            return null;
        }

        return artistAlbums.items.reduce((acc, album) => {
            if (!album.album_group || acc.includes(album.album_group)) {
                return acc;
            }

            acc.push(album.album_group);
            return acc;
        }, [] as AlbumGroup[]);
    }, [artistAlbums]);

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

    const handleFollowArtist = () => {
        saveArtistToCache(0);
        return followArtist(access_token, [artist.id]);
    };

    const handleUnfollowArtist = () => {
        removeArtistFromCache(0);
        return unfollowArtist(access_token, [artist.id]);
    };

    return (
        <ArtistContext.Provider
            value={{
                isFollowing: !!followedArtists && followedArtists[0],
                savedTracks,
                albumGroup,
                albumGroups,
                albums,
                appearsOn: artistAppearsOn ? artistAppearsOn.items : null,
                relatedArtists: artistRelatedArtists ? artistRelatedArtists.artists : null,
                popularTracksLength,
                hasMorePopularTracks,
                hasLessPopularTracks,
                setAlbumGroup,
                showMorePopularTracks,
                showLessPopularTracks,
                handleSaveTrack,
                handleRemoveTrack,
                handleFollowArtist,
                handleUnfollowArtist,
            }}>
            {children}
        </ArtistContext.Provider>
    );
};

export const useArtist = () => useContext(ArtistContext);
