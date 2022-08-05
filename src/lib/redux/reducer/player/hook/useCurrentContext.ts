import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useCurrentContext = () => {
    return useSelector((state: RootState) => state.player.currentContext);
};
