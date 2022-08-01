import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { AlbumProps } from "./Album";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import { ALBUM_TRACKS_OFFSET, getAlbumTracks, removeAlbum, saveAlbum } from "@lib/api/album";
import { useSession } from "@lib/context/session";
import { useSavedAlbumsContainsQuery } from "@lib/api/album/hook/useSavedAlbumsContainsQuery";

type AlbumDiscs = Record<string, SpotifyApi.TrackObjectSimplified[]>;

interface AlbumContextData {
    isFollowing: boolean;
    total: number;
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
        handleSaveAlbum,
        handleRemoveAlbum,
    } = useSavedAlbumsContainsQuery([album.id]);

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        handleSaveTrack,
        handleRemoveTrack,
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

    return (
        <AlbumContext.Provider
            value={{
                isFollowing: !!savedAlbumsContains && savedAlbumsContains[0],
                total: album.total_tracks,
                discs,
                savedTracks,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handleSaveTrack,
                handleRemoveTrack,
                handleSaveAlbum: () => handleSaveAlbum(album.id, 0),
                handleRemoveAlbum: () => handleRemoveAlbum(album.id, 0),
            }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbum = () => useContext(AlbumContext);
