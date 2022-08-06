import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const usePausedSelector = () => {
    return useSelector((state: RootState) => state.player.paused);
};
