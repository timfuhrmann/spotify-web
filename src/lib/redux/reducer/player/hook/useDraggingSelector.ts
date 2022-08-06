import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useDraggingSelector = () => {
    return useSelector((state: RootState) => state.progress.dragging);
};
