import React, { createContext, PropsWithChildren } from "react";

interface RecentlyPlayedContextData {}

const RecentlyPlayedContext = createContext<RecentlyPlayedContextData>(
    {} as RecentlyPlayedContextData
);

//@todo get localstorage
export const RecentlyPlayedProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <RecentlyPlayedContext.Provider value={{}}>{children}</RecentlyPlayedContext.Provider>;
};
