import React from "react";
import { PrimaryLayout } from "../../../src/components/layout/PrimaryLayout";
import { NextPageWithLayout } from "@type/page";
import { useRouter } from "next/router";
import { Artist as ArtistComponent } from "../../../src/components/page/Artist/Artist";
import { useArtistQuery } from "@lib/api/artist/query/useArtistQuery";
import { getIdFromQuery } from "@lib/util";
import { useArtistsTopTracksQuery } from "@lib/api/artist/query/useArtistsTopTracksQuery";
import { Meta } from "@lib/meta";

const Artist: NextPageWithLayout = () => {
    const { query } = useRouter();

    const id = getIdFromQuery(query);

    const { data: artist } = useArtistQuery(id);
    const { data: artistTopTracks } = useArtistsTopTracksQuery(id);

    if (!artist || !artistTopTracks) {
        return null;
    }

    return (
        <React.Fragment>
            <Meta title={artist.name} />
            <ArtistComponent artist={artist} topTracks={artistTopTracks} />
        </React.Fragment>
    );
};

// eslint-disable-next-line react/display-name
Artist.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Artist;
