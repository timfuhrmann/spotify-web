import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRouter } from "next/router";
import { Playlist as PlaylistComponent } from "../../src/components/playlist/Playlist";
import { useDominantColor } from "@lib/hook/useDominantColor";
import { usePlaylistQuery } from "@lib/api/hook/usePlaylistQuery";
import { getIdFromQuery } from "@lib/util";

const Playlist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { data: playlist } = usePlaylistQuery(getIdFromQuery(query));

    useDominantColor(playlist ? playlist.images : null);

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
