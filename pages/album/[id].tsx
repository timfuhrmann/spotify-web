import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useSession } from "@lib/context/session";
import { useDominantColor } from "@lib/hook/useDominantColor";
import { getAlbum } from "@lib/api/album";
import { Album } from "../../src/components/album/Album";

const Playlist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { access_token } = useSession();

    const { id } = query;

    const { data: album } = useQuery(
        ["album", id, access_token],
        () => getAlbum(access_token, id && typeof id === "string" ? id : null),
        { enabled: !!access_token && !!id && typeof id === "string" }
    );

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
