import { createContext, useContext } from "react";

interface NavigationContextData {
    hasBack: boolean;
    hasForth: boolean;
    navigateBack: () => void;
    navigateForth: () => void;
}

export const NavigationContext = createContext<NavigationContextData>({} as NavigationContextData);

export const useNavigation = () => useContext(NavigationContext);
