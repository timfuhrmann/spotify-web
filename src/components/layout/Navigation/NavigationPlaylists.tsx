import React from "react";
import styled from "styled-components";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useRootPlaylists } from "@lib/context/root-playlists";
import { createArray } from "@lib/util";
import { NavigationPlaylistItem } from "./NavigationPlaylistItem";

const PlaylistsWrapper = styled.div`
    position: relative;
    flex: 1;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
    }
`;

const PlaylistStage = styled(OverlayScrollbarsComponent)`
    height: 100%;
`;

const PlaylistFrame = styled.div`
    padding: 1rem 0;
`;

export const NavigationPlaylists: React.FC = () => {
    const { playlists } = useRootPlaylists();

    return (
        <PlaylistsWrapper>
            {playlists ? (
                <PlaylistStage className="custom-scrollbar">
                    <PlaylistFrame>
                        {playlists.map(({ id, name }) => (
                            <NavigationPlaylistItem key={id} id={id} name={name} />
                        ))}
                    </PlaylistFrame>
                </PlaylistStage>
            ) : (
                <PlaylistFrame>
                    <NavigationPlaylistItem.Skeleton width={40} />
                    <NavigationPlaylistItem.Skeleton width={60} />
                    <NavigationPlaylistItem.Skeleton width={45} />
                    <NavigationPlaylistItem.Skeleton width={55} />
                    <NavigationPlaylistItem.Skeleton width={40} />
                    <NavigationPlaylistItem.Skeleton width={75} />
                    <NavigationPlaylistItem.Skeleton width={45} />
                    <NavigationPlaylistItem.Skeleton width={50} />
                    <NavigationPlaylistItem.Skeleton width={40} />
                    <NavigationPlaylistItem.Skeleton width={65} />
                </PlaylistFrame>
            )}
        </PlaylistsWrapper>
    );
};
