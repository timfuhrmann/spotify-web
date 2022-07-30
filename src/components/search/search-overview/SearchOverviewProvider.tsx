import React, { createContext, PropsWithChildren, useContext } from "react";
import { useSearch } from "@lib/context/search";
import { useSavedTracksContainsQuery } from "@lib/api/track/hook/useSavedTracksContainsQuery";

interface SearchOverviewContextData {
    savedTracks: boolean[];
    handleSaveTrack: (id: string, index: number) => void;
    handleRemoveTrack: (id: string, index: number) => void;
}

const SearchOverviewContext = createContext<SearchOverviewContextData>(
    {} as SearchOverviewContextData
);

export const SearchOverviewProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { artists, playlists, tracks } = useSearch();

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
