import React from "react";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRouter } from "next/router";
import { Playlist as PlaylistComponent } from "../../src/components/page/Playlist/Playlist";
import { usePlaylistQuery } from "@lib/api/playlist/query/usePlaylistQuery";
import { getIdFromQuery } from "@lib/util";
import { Meta } from "@lib/meta";

const Playlist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { data: playlist } = usePlaylistQuery(getIdFromQuery(query));

    if (!playlist) {
        return null;
    }

    return (
        <React.Fragment>
            <Meta title={playlist.name} />
            <PlaylistComponent playlist={playlist} />
        </React.Fragment>
    );
};

// eslint-disable-next-line react/display-name
Playlist.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Playlist;
