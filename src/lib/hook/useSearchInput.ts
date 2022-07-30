import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pathnameFromAsPath } from "@lib/util";

export const useSearchInput = () => {
    const { query: routerQuery, asPath, replace, prefetch, isReady } = useRouter();
    const [value, setValue] = useState<string>("");

    const { query } = routerQuery;
    const pathname = pathnameFromAsPath(asPath);

    useEffect(() => {
        if (!isReady || !query || typeof query !== "string" || value) {
            return;
        }

        setValue(query);
    }, [query, isReady]);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        if (!value && pathname !== "/browse") {
            replace("/browse");
            return;
        } else if (!value) {
            return;
        }

        replace(
            {
                pathname: pathname.includes("/search/") ? pathname : "/browse/search",
                query: { query: value },
            },
            undefined,
            {
                shallow: pathname.includes("/search/"),
            }
        );
    }, [value, isReady]);

    return {
        value,
        setValue,
    };
};
