import React from "react";
import styled from "styled-components";
import { RecentlyPlayedProvider } from "./RecentlyPlayedProvider";
import { RecentlyPlayedPlaylist } from "./RecentlyPlayedPlaylist";
import { createArray } from "@lib/util";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";
import { breakpoints } from "@css/helper/breakpoints";

const PlayedWrapper = styled.div``;

const PlayedGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max(27rem, 25%), 1fr));
    gap: 1.2rem;

    ${breakpoints().min("l")} {
        gap: 2.4rem;
    }
`;

export const RecentlyPlayed: React.FC = () => {
    const { data: playlists } = useRootPlaylistsQuery();

    return (
        <RecentlyPlayedProvider>
            <PlayedWrapper>
                <PlayedGrid>
                    {playlists ? (
                        <React.Fragment>
                            {playlists.slice(0, 6).map(({ id, name, images }) => (
                                <RecentlyPlayedPlaylist
                                    key={id}
                                    id={id}
                                    name={name}
                                    images={images}
                                />
                            ))}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {createArray(6).map(index => (
                                <RecentlyPlayedPlaylist.Skeleton key={index} />
                            ))}
                        </React.Fragment>
                    )}
                </PlayedGrid>
            </PlayedWrapper>
        </RecentlyPlayedProvider>
    );
};
