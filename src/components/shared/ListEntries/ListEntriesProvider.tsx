import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";
import { ListEntriesProps } from "./ListEntries";
import { EntryProps } from "../Entry";

interface ListEntriesContextData {
    activeTag: string | null;
    setActiveTag: Dispatch<SetStateAction<string | null>>;
    tags: string[] | null;
    entries: EntryProps[] | null;
}

const ListEntriesContext = createContext<ListEntriesContextData>({} as ListEntriesContextData);

export const ListEntriesProvider: React.FC<
    PropsWithChildren<Pick<ListEntriesProps, "entries">>
> = ({ children, entries: initialEntries }) => {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const tags =
        initialEntries && !Array.isArray(initialEntries) ? Object.keys(initialEntries) : null;

    const entries = useMemo<EntryProps[] | null>(() => {
        if (!initialEntries) {
            return null;
        } else if (Array.isArray(initialEntries)) {
            return initialEntries;
        }

        return activeTag
            ? initialEntries[activeTag]
            : Object.keys(initialEntries).flatMap(key => initialEntries[key]);
    }, [initialEntries, activeTag]);

    return (
        <ListEntriesContext.Provider
            value={{
                activeTag,
                setActiveTag,
                tags,
                entries,
            }}>
            {children}
        </ListEntriesContext.Provider>
    );
};

export const useListEntries = () => useContext(ListEntriesContext);
