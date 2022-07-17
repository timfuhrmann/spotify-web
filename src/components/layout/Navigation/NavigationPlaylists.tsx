import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { hover } from "@css/helper";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useRootPlaylists } from "@lib/context/root-playlists";

const PlaylistsWrapper = styled.div`
    position: relative;
    flex: 1;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
`;

const PlaylistsStage = styled(OverlayScrollbarsComponent)`
    padding: 1rem 0;
    height: 100%;
`;

const PlaylistsItem = styled.a`
    display: block;
    padding: 0.6rem 2.4rem;
    color: ${p => p.theme.gray700};
    ${text("textSm")};

    ${p => hover`
        color: ${p.theme.gray900};
    `};

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

export const NavigationPlaylists: React.FC = () => {
    const { playlists } = useRootPlaylists();

    return (
        <PlaylistsWrapper>
            {playlists && (
                <PlaylistsStage className="custom-scrollbar">
                    {playlists.map(playlist => (
                        <Link key={playlist.id} href={"/playlist/" + playlist.id} passHref>
                            <PlaylistsItem>{playlist.name}</PlaylistsItem>
                        </Link>
                    ))}
                </PlaylistsStage>
            )}
        </PlaylistsWrapper>
    );
};
