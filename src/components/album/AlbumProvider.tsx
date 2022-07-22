import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { AlbumProps } from "./Album";
import { useInfiniteTracksWithSavedTracksContains } from "@lib/hook/useInfiniteTracksWithSavedTracksContains";
import {
    ALBUM_TRACKS_OFFSET,
    getAlbumTracks,
    getSavedAlbumsContains,
    removeAlbum,
    saveAlbum,
} from "@lib/api/album";
import { useSession } from "@lib/context/session";
import { removeTracks, saveTracks } from "@lib/api/track";
import { InfiniteData, QueryKey, useQuery } from "react-query";
import { queryClient } from "@lib/api";
import cloneDeep from "lodash.clonedeep";

type AlbumDiscs = Record<string, SpotifyApi.TrackObjectSimplified[]>;

interface AlbumContextData {
    isFollowing: boolean;
    total: number;
    discs: AlbumDiscs;
    savedTracks: boolean[];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handleSaveTrack: (id: string, index: number) => Promise<void>;
    handleRemoveTrack: (id: string, index: number) => Promise<void>;
    handleSaveAlbum: () => Promise<void>;
    handleRemoveAlbum: () => Promise<void>;
}

const AlbumContext = createContext<AlbumContextData>({} as AlbumContextData);

export const AlbumProvider: React.FC<PropsWithChildren<AlbumProps>> = ({ album, children }) => {
    const { access_token } = useSession();
    const { data: savedAlbumsContains } = useQuery(
        ["saved-albums-contains", album.id, access_token],
        () => getSavedAlbumsContains(access_token, [album.id]),
        { enabled: !!access_token }
    );

    const {
        isLoading,
        tracksPages,
        savedTracks,
        hasNextPage,
        fetchNextPage,
        addSavedTrackToCache,
        removeSavedTrackFromCache,
    } = useInfiniteTracksWithSavedTracksContains<SpotifyApi.AlbumTracksResponse>({
        key: "album-tracks",
        initialTracks: album.tracks,
        limit: ALBUM_TRACKS_OFFSET,
        queryFn: ({ pageParam = 1 }) => getAlbumTracks(access_token, album.id, pageParam),
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

    const handleSaveTrack = async (id: string, index: number): Promise<void> => {
        addSavedTrackToCache(index);
        return saveTracks(access_token, [id]);
    };

    const handleRemoveTrack = async (id: string, index: number): Promise<void> => {
        removeSavedTrackFromCache(index);
        return removeTracks(access_token, [id]);
    };

    const writeToSavedAlbumsContainsCache = (value: boolean) => {
        return queryClient.setQueryData<boolean[] | undefined>(
            ["saved-albums-contains", album.id, access_token],
            () => {
                return [value];
            }
        );
    };

    const handleSaveAlbum = async (): Promise<void> => {
        writeToSavedAlbumsContainsCache(true);
        return saveAlbum(access_token, [album.id]);
    };

    const handleRemoveAlbum = async (): Promise<void> => {
        writeToSavedAlbumsContainsCache(false);
        return removeAlbum(access_token, [album.id]);
    };

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
                handleSaveAlbum,
                handleRemoveAlbum,
            }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbum = () => useContext(AlbumContext);
