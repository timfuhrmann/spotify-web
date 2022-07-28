import { useEffect, useRef } from "react";

export interface ClickOutsideOptions {
    callback: () => void;
}

export const useClickOutside = <T extends HTMLElement>({ callback }: ClickOutsideOptions) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    return ref;
};
