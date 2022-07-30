import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSearchByTypeMutation } from "@lib/api/browse/hook/useSearchByTypeMutation";
import { useSession } from "@lib/context/session";
import { BrowseType } from "@lib/api/browse";
import { SearchContext } from "@lib/context/search/index";
import { objectKeys } from "@lib/util";

const SearchWrapper = styled.div``;

export const SearchProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { access_token } = useSession();
    const { query: routerQuery } = useRouter();
    const { query } = routerQuery;
    const [results, setResults] = useState<SpotifyApi.SearchResponse | undefined>(undefined);

    const { data, mutate, isLoading, isIdle } = useSearchByTypeMutation();

    const topArtist = results && results.artists ? results.artists.items[0] : null;

    useEffect(() => {
        if (!access_token || !query || typeof query !== "string") {
            return;
        }

        mutate({
            access_token,
            query,
            type: [BrowseType.Artist, BrowseType.Album, BrowseType.Track, BrowseType.Playlist],
        });
    }, [access_token, query]);

    useEffect(() => {
        if (!data) {
            return;
        }

        setResults(data);
    }, [data]);

    const typesFound = useMemo<(keyof SpotifyApi.SearchResponse)[]>(() => {
        if (!results) {
            return [];
        }

        return objectKeys(results).filter(key => {
            const result = results[key];
            return result && result.items.length > 0;
        });
    }, [results]);

    const getType = useCallback(
        <K extends keyof SpotifyApi.SearchResponse>(
            type: K
        ): SpotifyApi.SearchResponse[K] | undefined => {
            if (!results) {
                return;
            }

            const result = results[type];
            return result && result.items.length > 0 ? result : undefined;
        },
        [results]
    );

    return (
        <SearchContext.Provider
            value={{
                isLoading: isLoading || isIdle,
                typesFound,
                topArtist,
                playlists: getType("playlists"),
                albums: getType("albums"),
                tracks: getType("tracks"),
                artists: getType("artists"),
            }}>
            <SearchWrapper>{children}</SearchWrapper>
        </SearchContext.Provider>
    );
};
