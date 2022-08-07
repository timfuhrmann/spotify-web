import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useVolumeDraggingSelector = () => {
    return useSelector((state: RootState) => state.volume.dragging);
};
