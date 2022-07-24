import React from "react";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { NextPageWithLayout } from "@type/page";
import { useRouter } from "next/router";
import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { getArtist, getArtistTopTracks } from "@lib/api/artist";
import { Artist as ArtistComponent } from "../../src/components/artist/Artist";
import { useDominantColor } from "@lib/hook/useDominantColor";

const Artist: NextPageWithLayout = () => {
    const { query } = useRouter();
    const { access_token } = useSession();

    const { id } = query;

    const enabled = !!access_token && !!id && typeof id === "string";

    const { data: artist } = useQuery(
        ["artist", id, access_token],
        () => getArtist(access_token, id && typeof id === "string" ? id : null),
        { enabled }
    );

    const { data: artistTopTracks } = useQuery(
        ["artist-top-tracks", id, access_token],
        () => getArtistTopTracks(access_token, id && typeof id === "string" ? id : null),
        { enabled }
    );

    useDominantColor(artist ? artist.images : null);

    if (!artist || !artistTopTracks) {
        return null;
    }

    return <ArtistComponent artist={artist} topTracks={artistTopTracks} />;
};

// eslint-disable-next-line react/display-name
Artist.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Artist;
