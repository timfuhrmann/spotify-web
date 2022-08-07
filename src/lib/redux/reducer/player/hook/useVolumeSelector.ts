import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useVolumeSelector = () => {
    return useSelector((state: RootState) => state.volume.volume);
};
