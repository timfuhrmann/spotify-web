import React from "react";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { NextPageWithLayout } from "@type/page";
import { useRouter } from "next/router";
import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { getArtist } from "@lib/api/artist";
import { Artist as ArtistComponent } from "../../src/components/artist/Artist";
import { useDominantColor } from "@lib/hook/useDominantColor";

const Artist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { access_token } = useSession();

    const { id } = query;

    const { data: artist } = useQuery(
        ["artist", id, access_token],
        () => getArtist(access_token, id && typeof id === "string" ? id : null),
        { enabled: !!access_token && !!id && typeof id === "string" }
    );

    useDominantColor(artist ? artist.images : null);

    if (!artist) {
        return null;
    }

    return <ArtistComponent {...artist} />;
};

// eslint-disable-next-line react/display-name
Artist.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Artist;
