import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { SavedTracksProps } from "./SavedTracks";
import { useInfiniteTracks } from "@lib/hook/useInfiniteTracks";
import { getSavedTracks } from "@lib/api/track";
import { useSession } from "@lib/context/session";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";
import { useRemoveTracksMutation } from "@lib/api/track/mutation/useRemoveTracksMutation";
import { resetContext, setContext } from "@lib/redux/reducer/context";
import { useAppDispatch } from "@lib/redux";

interface SavedTracksContextData {
    tracks: SpotifyApi.SavedTrackObject[];
    total: number;
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    handlePlay: (index?: number) => void;
    handleUnlikeTrack: (id: string, index: number) => void;
}

const SavedTracksContext = createContext<SavedTracksContextData>({} as SavedTracksContextData);

export const SavedTracksProvider: React.FC<PropsWithChildren<SavedTracksProps>> = ({
    initialTracks,
    children,
}) => {
    const dispatch = useAppDispatch();
    const { session, access_token } = useSession();
    const { mutate: mutateRemove } = useRemoveTracksMutation();
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();

    const { isLoading, tracksPages, hasNextPage, fetchNextPage, writeToTracksCache } =
        useInfiniteTracks<SpotifyApi.UsersSavedTracksResponse>({
            key: "saved-tracks",
            initialTracks,
            enabled: !!access_token,
            queryFn: ({ pageParam = 1 }) => getSavedTracks(access_token!, pageParam),
            getNextPageParam: (data, allPages) => {
                const lastPage = allPages[allPages.length - 1];

                return lastPage && initialTracks.total > lastPage.offset + lastPage.limit
                    ? allPages.length
                    : null;
            },
        });

    useEffect(() => {
        if (!session) {
            return;
        }

        dispatch(setContext({ context_uri: session.uri + ":collection", name: "Liked Songs" }));

        return () => {
            dispatch(resetContext());
        };
    }, [session]);

    const tracks = useMemo<SpotifyApi.SavedTrackObject[]>(() => {
        if (!tracksPages) {
            return initialTracks.items;
        }

        return tracksPages.pages.flatMap(page => (page ? page.items : []));
    }, [tracksPages, initialTracks]);

    const removeTrackFromCache = (id: string, index: number) => {
        writeToTracksCache(cachedData => {
            if (!cachedData) {
                return cachedData;
            }

            const pageIndex = Math.floor(index / initialTracks.limit);

            return {
                ...cachedData,
                pages: cachedData.pages.map((page, index) => {
                    if (!page || index !== pageIndex) {
                        return page;
                    }

                    return {
                        ...page,
                        items: page.items.flatMap(item => (item.track.id === id ? [] : item)),
                    };
                }),
            };
        });
    };

    const handleUnlikeTrack = useCallback(
        async (id: string, index: number) => {
            if (!access_token) {
                return;
            }

            removeTrackFromCache(id, index);
            mutateRemove({ ids: [id] });
        },
        [access_token, tracksPages]
    );

    const handlePlay = useCallback(
        (index: number = 0) => {
            if (!session) {
                return;
            }

            mutatePlay({
                context_uri: session.uri + ":collection",
                offset: { position: index },
            });
        },
        [session, tracks]
    );

    return (
        <SavedTracksContext.Provider
            value={{
                total: initialTracks.total,
                tracks,
                isLoading,
                hasNextPage,
                fetchNextPage,
                handlePlay,
                handleUnlikeTrack,
            }}>
            {children}
        </SavedTracksContext.Provider>
    );
};

export const useSavedTracks = () => useContext(SavedTracksContext);
