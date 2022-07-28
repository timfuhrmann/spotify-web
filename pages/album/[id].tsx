import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRouter } from "next/router";
import { useDominantColor } from "@lib/hook/useDominantColor";
import { Album } from "../../src/components/album/Album";
import { useAlbumQuery } from "@lib/api/album/hook/useAlbumQuery";
import { getIdFromQuery } from "@lib/util";

const Playlist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { data: album } = useAlbumQuery(getIdFromQuery(query));

    useDominantColor(album ? album.images : null);

    if (!album) {
        return null;
    }

    return <Album album={album} />;
};

// eslint-disable-next-line react/display-name
Playlist.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Playlist;
