import React, { createContext, PropsWithChildren, useContext } from "react";
import { useSavedTracksContainsQuery } from "@lib/api/track/hook/useSavedTracksContainsQuery";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

interface SearchOverviewContextData {
    savedTracks: boolean[];
    handleSaveTrack: (id: string, index: number) => void;
    handleRemoveTrack: (id: string, index: number) => void;
}

const SearchOverviewContext = createContext<SearchOverviewContextData>(
    {} as SearchOverviewContextData
);

export const SearchOverviewProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const tracks = useSelector((state: RootState) => state.search.tracks);

    const {
        data: savedTracks = [],
        handleSaveTrack,
        handleRemoveTrack,
    } = useSavedTracksContainsQuery(tracks ? tracks.items.map(track => track.id) : []);

    return (
        <SearchOverviewContext.Provider value={{ savedTracks, handleSaveTrack, handleRemoveTrack }}>
            {children}
        </SearchOverviewContext.Provider>
    );
};

export const useSearchOverview = () => useContext(SearchOverviewContext);
