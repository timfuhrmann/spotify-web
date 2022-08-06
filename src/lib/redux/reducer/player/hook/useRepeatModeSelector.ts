import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useRepeatModeSelector = () => {
    return useSelector((state: RootState) => state.player.repeat_mode);
};
