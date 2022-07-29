import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { createContext, MutableRefObject, useContext } from "react";

interface OverlayScrollContextData {
    targetRef: MutableRefObject<HTMLDivElement | null>;
    initOverlayScrollbars: (os: OverlayScrollbarsComponent | null) => void;
    stopScroll: () => void;
    resumeScroll: () => void;
    onScroll: (e: UIEvent | undefined) => void;
}

export const OverlayScrollContext = createContext<OverlayScrollContextData>(
    {} as OverlayScrollContextData
);

export const useOverlayScroll = () => useContext(OverlayScrollContext);
