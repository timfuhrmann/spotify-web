import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useCurrentTrackContextSelector = () => {
    return useSelector((state: RootState) => state.player.currentContext);
};
