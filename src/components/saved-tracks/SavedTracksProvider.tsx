import cloneDeep from "lodash.clonedeep";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SavedTracksProps } from "./SavedTracks";
import { useInfiniteTracks } from "@lib/hook/useInfiniteTracks";
import { getSavedTracks, removeTracks, saveTracks } from "@lib/api/track";
import { useSession } from "@lib/context/session";

interface SavedTracksContextData {
    tracks: SpotifyApi.SavedTrackObject[];
    total: number;
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handleRemoveTrack: (id: string, index: number) => Promise<void>;
}

const SavedTracksContext = createContext<SavedTracksContextData>({} as SavedTracksContextData);

export const SavedTracksProvider: React.FC<PropsWithChildren<SavedTracksProps>> = ({
    initialTracks,
    children,
}) => {
    const { access_token } = useSession();

    const { isLoading, tracksPages, hasNextPage, fetchNextPage, writeToTracksCache } =
        useInfiniteTracks<SpotifyApi.UsersSavedTracksResponse>({
            key: ["saved-tracks-list"],
            initialTracks,
            queryFn: ({ pageParam = 1 }) => getSavedTracks(access_token, pageParam),
            getNextPageParam: (data, allPages) => {
                const lastPage = allPages[allPages.length - 1];

                return lastPage && initialTracks.total > lastPage.offset + lastPage.limit
                    ? allPages.length
                    : null;
            },
        });

    const tracks = useMemo<SpotifyApi.SavedTrackObject[]>(() => {
        if (!tracksPages) {
            return initialTracks.items;
        }

        return tracksPages.pages.flatMap(page => (page ? page.items : []));
    }, [tracksPages, initialTracks]);

    const removeTrackFromCache = (index: number) => {
        writeToTracksCache(data => {
            if (!data) {
                return data;
            }

            const newData = cloneDeep(data);

            const pageIndex = Math.floor(index / initialTracks.limit);
            const page = newData.pages[pageIndex];

            if (!page) {
                return newData;
            }

            const cachedItem = tracks[index];
            const at = page.items.findIndex(({ track }) => track.id === cachedItem.track.id);

            if (at > -1) {
                page.items.splice(at, 1);
            }

            return newData;
        });
    };

    const handleRemoveTrack = async (id: string, index: number) => {
        removeTrackFromCache(index);
        removeTracks(access_token, [id]);
    };

    return (
        <SavedTracksContext.Provider
            value={{
                tracks,
                total: initialTracks.total,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handleRemoveTrack,
            }}>
            {children}
        </SavedTracksContext.Provider>
    );
};

export const useSavedTracks = () => useContext(SavedTracksContext);
