import React, { createContext, PropsWithChildren, useCallback, useContext } from "react";
import { useSavedTracksContainsQuery } from "@lib/api/track/query/useSavedTracksContainsQuery";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";
import { useStartResumePlaybackMutation } from "@lib/api/player/mutation/useStartResumePlaybackMutation";

interface SearchOverviewContextData {
    savedTracks: boolean[];
    handlePlay: (index?: number) => void;
    handleLikeTrack: (id: string, index: number) => void;
    handleUnlikeTrack: (id: string, index: number) => void;
}

const SearchOverviewContext = createContext<SearchOverviewContextData>(
    {} as SearchOverviewContextData
);

export const SearchOverviewProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const tracks = useSelector((state: RootState) => state.search.tracks);
    const { mutate: mutatePlay } = useStartResumePlaybackMutation();

    const {
        data: savedTracks = [],
        handleLikeTrack,
        handleUnlikeTrack,
    } = useSavedTracksContainsQuery(tracks ? tracks.items.map(track => track.id) : []);

    const handlePlay = useCallback(
        (index: number = 0) => {
            if (!tracks) {
                return;
            }

            mutatePlay({
                uris: tracks.items.map(track => track.uri),
                offset: { position: index },
            });
        },
        [tracks]
    );

    return (
        <SearchOverviewContext.Provider
            value={{
                savedTracks,
                handlePlay,
                handleLikeTrack,
                handleUnlikeTrack,
            }}>
            {children}
        </SearchOverviewContext.Provider>
    );
};

export const useSearchOverview = () => useContext(SearchOverviewContext);
