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
import { useSavedTracksContainsQuery } from "@lib/api/track/query/useSavedTracksContainsQuery";
import { useArtistsAlbumsQuery } from "@lib/api/artist/query/useArtistsAlbumsQuery";
import { useFollowedArtistsContains } from "@lib/api/artist/query/useFollowedArtistsContainsQuery";
import { AlbumGroupType } from "@type/album";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";
import { useFollowArtistMutation } from "@lib/api/artist/mutation/useFollowArtistMutation";
import { useUnfollowArtistMutation } from "@lib/api/artist/mutation/useUnfollowArtistMutation";

interface ArtistContextData {
    isFollowing: boolean;
    savedTracks: boolean[];
    albums: Record<string, SpotifyApi.AlbumObjectSimplified[]> | null;
    popularTracksLength: number;
    hasMorePopularTracks: boolean;
    hasLessPopularTracks: boolean;
    showMorePopularTracks: () => void;
    showLessPopularTracks: () => void;
    handlePlay: (index?: number) => void;
    handleLikeTrack: (id: string, index: number) => void;
    handleUnlikeTrack: (id: string, index: number) => void;
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
    const { mutate: mutateFollow } = useFollowArtistMutation();
    const { mutate: mutateUnfollow } = useUnfollowArtistMutation();
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();
    const [popularTracksLength, setPopularTracksLength] = useState(Math.min(5, topTracks.length));

    const {
        data: followedArtists = [],
        saveArtistToCache,
        removeArtistFromCache,
    } = useFollowedArtistsContains([artist.id]);

    const {
        data: savedTracks = [],
        handleLikeTrack,
        handleUnlikeTrack,
    } = useSavedTracksContainsQuery(topTracks.map(track => track.id));

    const { data: artistAlbums } = useArtistsAlbumsQuery(artist.id);

    const hasMorePopularTracks = popularTracksLength < topTracks.length;
    const hasLessPopularTracks = popularTracksLength > Math.min(5, topTracks.length);

    const albumGroups = useMemo<AlbumGroupType[] | null>(() => {
        if (!artistAlbums) {
            return null;
        }

        return artistAlbums.items.reduce((acc, album) => {
            if (!album.album_group || acc.includes(album.album_group)) {
                return acc;
            }

            acc.push(album.album_group);
            return acc;
        }, [] as AlbumGroupType[]);
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

    const showMorePopularTracks = () => {
        setPopularTracksLength(topTracks.length);
    };

    const showLessPopularTracks = () => {
        setPopularTracksLength(Math.min(5, topTracks.length));
    };

    const handlePlay = useCallback(
        (index: number = 0) => {
            mutatePlay({
                uris: topTracks.map(track => track.uri),
                offset: { position: index },
            });
        },
        [topTracks]
    );

    const handleFollowArtist = () => {
        if (!access_token) {
            return;
        }

        saveArtistToCache(0);
        mutateFollow({ ids: [artist.id] });
    };

    const handleUnfollowArtist = () => {
        if (!access_token) {
            return;
        }

        removeArtistFromCache(0);
        mutateUnfollow({ ids: [artist.id] });
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
                handlePlay,
                handleLikeTrack,
                handleUnlikeTrack,
                handleFollowArtist,
                handleUnfollowArtist,
            }}>
            {children}
        </ArtistContext.Provider>
    );
};

export const useArtist = () => useContext(ArtistContext);
