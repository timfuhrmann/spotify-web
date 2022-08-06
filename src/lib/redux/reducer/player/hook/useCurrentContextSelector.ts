import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useCurrentContextSelector = () => {
    return useSelector((state: RootState) => state.player.currentContext);
};
