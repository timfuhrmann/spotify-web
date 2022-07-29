import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { ArtistProps } from "./Artist";
import { useSession } from "@lib/context/session";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useSavedTracksContainsQuery } from "@lib/api/track/hook/useSavedTracksContainsQuery";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { AlbumGroup, followArtist, unfollowArtist } from "@lib/api/artist";
import { useFollowedArtistsContains } from "@lib/api/artist/hook/useFollowedArtistsContainsQuery";

interface ArtistContextData {
    isFollowing: boolean;
    savedTracks: boolean[];
    albums: Record<string, SpotifyApi.AlbumObjectSimplified[]> | null;
    popularTracksLength: number;
    hasMorePopularTracks: boolean;
    hasLessPopularTracks: boolean;
    showMorePopularTracks: () => void;
    showLessPopularTracks: () => void;
    handleSaveTrack: (id: string, index: number) => void;
    handleRemoveTrack: (id: string, index: number) => void;
    handleFollowArtist: () => void;
    handleUnfollowArtist: () => void;
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

    const hasMorePopularTracks = popularTracksLength < topTracks.length;
    const hasLessPopularTracks = popularTracksLength > Math.min(5, topTracks.length);

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

    const albums = useMemo<Record<string, SpotifyApi.AlbumObjectSimplified[]> | null>(() => {
        if (!artistAlbums || !albumGroups) {
            return null;
        }

        return albumGroups.reduce((acc, groupKey) => {
            acc[groupKey] = artistAlbums.items.filter(album => album.album_group === groupKey);
            return acc;
        }, {} as Record<string, SpotifyApi.AlbumObjectSimplified[]>);
    }, [artistAlbums, albumGroups]);

    const handleSaveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            saveTrackToCache(index);
            return saveTracks(access_token, [id]);
        },
        [access_token]
    );

    const handleRemoveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            removeTrackFromCache(index);
            return removeTracks(access_token, [id]);
        },
        [access_token]
    );

    const showMorePopularTracks = () => {
        setPopularTracksLength(topTracks.length);
    };

    const showLessPopularTracks = () => {
        setPopularTracksLength(Math.min(5, topTracks.length));
    };

    const handleFollowArtist = () => {
        if (!access_token) {
            return;
        }

        saveArtistToCache(0);
        followArtist(access_token, [artist.id]);
    };

    const handleUnfollowArtist = () => {
        if (!access_token) {
            return;
        }

        removeArtistFromCache(0);
        unfollowArtist(access_token, [artist.id]);
    };

    return (
        <ArtistContext.Provider
            value={{
                isFollowing: !!followedArtists && followedArtists[0],
                savedTracks,
                albums,
                popularTracksLength,
                hasMorePopularTracks,
                hasLessPopularTracks,
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
