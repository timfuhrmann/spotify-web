import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const usePaused = () => {
    return useSelector((state: RootState) => state.player.paused);
};
