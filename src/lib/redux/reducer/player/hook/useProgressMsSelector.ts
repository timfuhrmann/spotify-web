import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useProgressMsSelector = () => {
    return useSelector((state: RootState) => state.progress.progress_ms);
};
