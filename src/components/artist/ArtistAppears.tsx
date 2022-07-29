import React from "react";
import styled from "styled-components";
import { ListEntries } from "../shared/ListEntries/ListEntries";
import { content } from "@css/helper/content";
import { useArtistsAlbumsQuery } from "@lib/api/artist/hook/useArtistsAlbumsQuery";
import { AlbumGroup } from "@lib/api/album";

const AppearsWrapper = styled.div`
    ${content()};
    width: 100%;
`;

interface ArtistAppearsProps {
    id: string;
    name: string;
}

export const ArtistAppears: React.FC<ArtistAppearsProps> = ({ id, name }) => {
    const { data: artistAppearsOn } = useArtistsAlbumsQuery(id, [AlbumGroup.AppearsOn]);

    return (
        <AppearsWrapper>
            <ListEntries
                headline={`Featuring ${name}`}
                entries={artistAppearsOn ? artistAppearsOn.items : null}
                type="album"
                link={`/artist/${id}/discography/appears_on`}
            />
        </AppearsWrapper>
    );
};
