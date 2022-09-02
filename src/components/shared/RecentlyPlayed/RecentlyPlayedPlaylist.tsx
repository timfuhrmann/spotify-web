import React, { useRef } from "react";
import styled, { useTheme } from "styled-components";
import { SpotifyImage } from "@lib/image";
import { text } from "@css/helper/typography";
import { fillParent, hover, square, transition } from "@css/helper";
import { PlayButton } from "../PlayButton";
import { Link } from "@lib/link";
import { Skeleton } from "@lib/skeleton";
import { SkeletonWrapper } from "@lib/skeleton/wrapper";
import { useDominantColor } from "@lib/hook/useDominantColor";

const PlaylistPlay = styled.div`
    position: relative;
    z-index: 1;
    ${square("4.8rem")};
    opacity: 0;
    ${transition("opacity", "0.1s")};

    @media (hover: none) {
        opacity: 1;
    }
`;

const PlaylistWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 8rem;
    border-radius: 0.4rem;
    background-color: ${p => p.theme.gray100};
    overflow: hidden;
    transform: translateZ(0);
    ${transition("background-color", "0.1s")};

    ${p => hover`
        background-color: ${p.theme.gray300};
        
        ${PlaylistPlay} {
            opacity: 1;
        }
    `};
`;

const PlaylistCover = styled.div`
    position: relative;
    width: 8rem;
    height: 100%;
    background-color: ${p => p.theme.gray300};
    box-shadow: 0 0.8rem 2.4rem rgba(0, 0, 0, 0.5);
`;

const PlaylistBody = styled.div`
    flex: 1 1 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2.4rem;
    padding: 0 2.4rem;
    min-width: 0;
`;

const PlaylistName = styled.div`
    flex: 1 1 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${text("textMd", "medium")};
`;

const PlaylistAnchor = styled.a`
    ${fillParent};
`;

interface ParentComposition {
    Skeleton: typeof RecentlyPlayedPlaylistSkeleton;
}

interface RecentlyPlayedPlaylistProps {
    id: string;
    name: string;
    images: SpotifyApi.ImageObject[];
}

export const RecentlyPlayedPlaylist: React.FC<RecentlyPlayedPlaylistProps> & ParentComposition = ({
    id,
    name,
    images,
}) => {
    const { handleImageLoad, setDominantColor, removeDominantColor } = useDominantColor(true);

    const handleMouseEnter = () => {
        setDominantColor();
    };

    const handleMouseLeave = () => {
        removeDominantColor();
    };

    return (
        <PlaylistWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <PlaylistCover>
                <SpotifyImage images={images} onLoad={handleImageLoad} />
            </PlaylistCover>
            <PlaylistBody>
                <PlaylistName>{name}</PlaylistName>
                <PlaylistPlay>
                    <PlayButton />
                </PlaylistPlay>
            </PlaylistBody>
            <Link href={"/playlist/" + id} label={name} prefetch={false}>
                <PlaylistAnchor />
            </Link>
        </PlaylistWrapper>
    );
};

const RecentlyPlayedPlaylistSkeleton: React.FC = () => {
    const theme = useTheme();

    return (
        <SkeletonWrapper>
            <PlaylistWrapper>
                <PlaylistCover />
                <PlaylistBody>
                    <PlaylistName>
                        <Skeleton style={{ backgroundColor: theme.gray300, maxWidth: "50%" }} />
                    </PlaylistName>
                </PlaylistBody>
            </PlaylistWrapper>
        </SkeletonWrapper>
    );
};

RecentlyPlayedPlaylist.Skeleton = RecentlyPlayedPlaylistSkeleton;
