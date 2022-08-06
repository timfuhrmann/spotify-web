import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { useAlbum } from "./AlbumProvider";
import { getTotalSongsString } from "@lib/util";
import { hover } from "@css/helper";
import { Link } from "@lib/link";

const HeadUser = styled.a`
    ${text("textSm", "bold")};

    ${p => hover`
        color: ${p.theme.gray900};
        text-decoration: underline;
    `};
`;

const HeadSongs = styled.span``;

interface AlbumHeadFooterProps {
    artists: SpotifyApi.ArtistObjectSimplified[];
}

export const AlbumHeadFooter: React.FC<AlbumHeadFooterProps> = ({ artists }) => {
    const { total } = useAlbum();

    return (
        <React.Fragment>
            <React.Fragment>
                {artists.map(artist => (
                    <React.Fragment key={artist.id}>
                        <Link href={"/artist/" + artist.id} label={artist.name}>
                            <HeadUser>{artist.name}</HeadUser>
                        </Link>{" "}
                        &#183;{" "}
                    </React.Fragment>
                ))}
            </React.Fragment>
            <HeadSongs>{getTotalSongsString(total)}</HeadSongs>
        </React.Fragment>
    );
};
