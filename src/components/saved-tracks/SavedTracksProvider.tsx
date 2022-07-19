import React, { createContext, PropsWithChildren } from "react";

interface SavedTracksContextData {}

const SavedTracksContext = createContext<SavedTracksContextData>({} as SavedTracksContextData);

export const SavedTracksProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <SavedTracksContext.Provider value={{}}>{children}</SavedTracksContext.Provider>;
};
