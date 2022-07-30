import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRouter } from "next/router";
import { Playlist as PlaylistComponent } from "../../src/components/page/playlist/Playlist";
import { usePlaylistQuery } from "@lib/api/playlist/hook/usePlaylistQuery";
import { getIdFromQuery } from "@lib/util";

const Playlist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { data: playlist } = usePlaylistQuery(getIdFromQuery(query));

    if (!playlist) {
        return null;
    }

    return <PlaylistComponent playlist={playlist} />;
};

// eslint-disable-next-line react/display-name
Playlist.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Playlist;
