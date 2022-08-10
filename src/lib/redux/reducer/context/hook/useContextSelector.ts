import { useSelector } from "react-redux";
import { RootState } from "@lib/redux";

export const useContextSelector = () => {
    return useSelector((state: RootState) => state.context);
};
