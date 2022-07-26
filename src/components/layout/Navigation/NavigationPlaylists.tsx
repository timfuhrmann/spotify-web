import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { hover } from "@css/helper";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useRootPlaylists } from "@lib/context/root-playlists";
import { useRouter } from "next/router";

const PlaylistsWrapper = styled.div`
    position: relative;
    flex: 1;

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

const PlaylistsItem = styled.a<{ $active: boolean }>`
    display: block;
    padding: 0.6rem 2.4rem;
    color: ${p => (p.$active ? p.theme.gray900 : p.theme.gray700)};
    ${text("textSm")};

    ${p => hover`
        color: ${p.theme.gray900};
    `};

    &:active {
        color: ${p => p.theme.gray900};
    }
`;

export const NavigationPlaylists: React.FC = () => {
    const { asPath } = useRouter();
    const { playlists } = useRootPlaylists();

    return (
        <PlaylistsWrapper>
            {playlists && (
                <PlaylistStage className="custom-scrollbar">
                    <PlaylistFrame>
                        {playlists.map(playlist => (
                            <Link key={playlist.id} href={"/playlist/" + playlist.id} passHref>
                                <PlaylistsItem
                                    $active={asPath.includes("/playlist/" + playlist.id)}>
                                    {playlist.name}
                                </PlaylistsItem>
                            </Link>
                        ))}
                    </PlaylistFrame>
                </PlaylistStage>
            )}
        </PlaylistsWrapper>
    );
};
