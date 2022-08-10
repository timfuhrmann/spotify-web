import React from "react";
import styled from "styled-components";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { NavigationPlaylistItem } from "./NavigationPlaylistItem";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";
import { useCurrentTrackContextSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackContextSelector";
import { usePausedSelector } from "@lib/redux/reducer/player/hook/usePausedSelector";

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
    const { data: playlists } = useRootPlaylistsQuery();
    const currentContext = useCurrentTrackContextSelector();
    const paused = usePausedSelector();

    return (
        <PlaylistsWrapper>
            {playlists ? (
                <PlaylistStage className="custom-scrollbar">
                    <PlaylistFrame>
                        {playlists.map(({ uri, id, name }) => (
                            <NavigationPlaylistItem
                                key={id}
                                id={id}
                                name={name}
                                isPlaying={!paused && currentContext === uri}
                            />
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
