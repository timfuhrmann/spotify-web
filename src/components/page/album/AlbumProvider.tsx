import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { AlbumProps } from "./Album";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { ALBUM_TRACKS_OFFSET, getAlbumTracks, removeAlbum, saveAlbum } from "@lib/api/album";
import { useSession } from "@lib/context/session";
import { removeTracks, saveTracks } from "@lib/api/track";
import { useSavedAlbumsContainsQuery } from "@lib/api/album/hook/useSavedAlbumsContainsQuery";

type AlbumDiscs = Record<string, SpotifyApi.TrackObjectSimplified[]>;

interface AlbumContextData {
    isFollowing: boolean;
    total: number;
    tracksLoaded: number;
    discs: AlbumDiscs;
    savedTracks: boolean[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handleSaveTrack: (id: string, index: number) => void;
    handleRemoveTrack: (id: string, index: number) => void;
    handleSaveAlbum: () => void;
    handleRemoveAlbum: () => void;
}

const AlbumContext = createContext<AlbumContextData>({} as AlbumContextData);

export const AlbumProvider: React.FC<PropsWithChildren<AlbumProps>> = ({ album, children }) => {
    const { access_token } = useSession();

    const {
        data: savedAlbumsContains,
        saveAlbumToCache,
        removeAlbumFromCache,
    } = useSavedAlbumsContainsQuery([album.id]);

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        addSavedTrackToCache,
        removeSavedTrackFromCache,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.AlbumTracksResponse>({
        key: album.id,
        initialTracks: album.tracks,
        limit: ALBUM_TRACKS_OFFSET,
        enabled: !!access_token,
        queryFn: ({ pageParam = 1 }) => getAlbumTracks(access_token!, album.id, pageParam),
        idsFn: page => page.items.flatMap(item => item.id),
        getNextPageParam: (data, allPages) => {
            const lastPage = allPages[allPages.length - 1];

            return lastPage && album.tracks.total > lastPage.offset + lastPage.limit
                ? allPages.length
                : null;
        },
    });

    const tracksLoaded = useMemo<number>(() => {
        if (!tracksPages) {
            return 0;
        }

        const page = tracksPages.pages[tracksPages.pages.length - 1];

        if (!page) {
            return 0;
        }

        return page.offset + page.items.length;
    }, [tracksPages]);

    const mapTracksByDiscNumber = (tracks: SpotifyApi.TrackObjectSimplified[]): AlbumDiscs => {
        return tracks.reduce((acc, track) => {
            if (!acc[track.disc_number]) {
                acc[track.disc_number] = [];
            }

            acc[track.disc_number].push(track);

            return acc;
        }, {} as AlbumDiscs);
    };

    const discs = useMemo<AlbumDiscs>(() => {
        if (!tracksPages) {
            return mapTracksByDiscNumber(album.tracks.items);
        }

        return mapTracksByDiscNumber(tracksPages.pages.flatMap(page => (page ? page.items : [])));
    }, [tracksPages, album]);

    const handleSaveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            addSavedTrackToCache(index);
            return saveTracks(access_token, [id]);
        },
        [access_token]
    );

    const handleRemoveTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            removeSavedTrackFromCache(index);
            return removeTracks(access_token, [id]);
        },
        [access_token]
    );

    const handleSaveAlbum = () => {
        if (!access_token) {
            return;
        }

        saveAlbumToCache();
        saveAlbum(access_token, [album.id]);
    };

    const handleRemoveAlbum = () => {
        if (!access_token) {
            return;
        }

        removeAlbumFromCache();
        removeAlbum(access_token, [album.id]);
    };

    return (
        <AlbumContext.Provider
            value={{
                isFollowing: !!savedAlbumsContains && savedAlbumsContains[0],
                total: album.total_tracks,
                tracksLoaded,
                discs,
                savedTracks,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handleSaveTrack,
                handleRemoveTrack,
                handleSaveAlbum,
                handleRemoveAlbum,
            }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbum = () => useContext(AlbumContext);
