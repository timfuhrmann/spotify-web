import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useDurationSelector = () => {
    return useSelector((state: RootState) => state.player.duration);
};
