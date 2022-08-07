import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useMutedSelector = () => {
    return useSelector((state: RootState) => state.volume.muted);
};
