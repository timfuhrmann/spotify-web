import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, useTransition } from "react";
import { pathnameFromAsPath } from "@lib/util";
import { searchByTypeThunk } from "@lib/redux/reducer/search";
import { useSession } from "@lib/context/session";
import { useAppDispatch } from "@lib/redux";

export const useSearchInput = () => {
    const dispatch = useAppDispatch();
    const { access_token } = useSession();
    const { query: routerQuery, asPath, replace, isReady } = useRouter();
    const [, startTransition] = useTransition();
    const [value, setValue] = useState("");

    const { query } = routerQuery;
    const pathname = pathnameFromAsPath(asPath);

    useEffect(() => {
        if (!isReady || !query || typeof query !== "string") {
            return;
        }

        setValue(query);
    }, [isReady]);

    useEffect(() => {
        if (!query || typeof query !== "string") {
            return;
        }

        debouncedQuery(query);
    }, [query]);

    const debouncedQuery = useCallback(
        debounce((query: string) => {
            if (!access_token) {
                return;
            }

            // @ts-ignore
            dispatch(searchByTypeThunk({ access_token, query }));
        }, 200),
        [access_token]
    );

    const handleInput = (input: string) => {
        setValue(input);
        startTransition(() => handleQuery(input));
    };

    const handleQuery = (input: string) => {
        if (!isReady) {
            return;
        }

        if (!input && pathname !== "/browse") {
            replace("/browse");
            return;
        } else if (!input) {
            return;
        }

        replace(
            {
                pathname: pathname.includes("/search/") ? pathname : "/browse/search",
                query: { query: input },
            },
            undefined,
            {
                shallow: pathname.includes("/search/"),
            }
        );
    };

    return {
        value,
        handleInput,
    };
};
