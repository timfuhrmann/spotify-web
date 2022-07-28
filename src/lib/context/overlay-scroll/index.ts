import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { createContext, useContext } from "react";

interface OverlayScrollContextData {
    initOverlayScrollbars: (os: OverlayScrollbarsComponent | null) => void;
    stopScroll: () => void;
    resumeScroll: () => void;
    onScroll: (e: UIEvent | undefined) => void;
}

export const OverlayScrollContext = createContext<OverlayScrollContextData>(
    {} as OverlayScrollContextData
);

export const useOverlayScroll = () => useContext(OverlayScrollContext);
