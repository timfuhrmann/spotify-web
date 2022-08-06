import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useShuffleSelector = () => {
    return useSelector((state: RootState) => state.player.shuffle);
};
