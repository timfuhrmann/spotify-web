import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { SavedTracks } from "../../src/components/saved-tracks/SavedTracks";
import { useSession } from "@lib/context/session";
import { useQuery } from "react-query";
import { getSavedTracks } from "@lib/api/track";

const Tracks: NextPageWithLayout = () => {
    const { access_token } = useSession();

    const { data: savedTracks } = useQuery(
        ["saved-tracks", access_token],
        () => getSavedTracks(access_token),
        { enabled: !!access_token }
    );

    if (!savedTracks) {
        return null;
    }

    return <SavedTracks initialTracks={savedTracks} />;
};

// eslint-disable-next-line react/display-name
Tracks.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Tracks;
