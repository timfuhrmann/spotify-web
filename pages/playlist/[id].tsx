import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPlaylist } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { Playlist as PlaylistComponent } from "../../src/components/playlist/Playlist";
import { useDominantColor } from "@lib/hook/useDominantColor";

const Playlist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { access_token } = useSession();

    const { id } = query;

    const { data: playlist } = useQuery(["playlist", id, access_token], () =>
        getPlaylist(access_token, id && typeof id === "string" ? id : null)
    );

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
