import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { SavedTracks } from "../../src/components/page/SavedTracks/SavedTracks";
import { useSavedTracksQuery } from "@lib/api/track/query/useSavedTracksQuery";

const Tracks: NextPageWithLayout = () => {
    const { data: savedTracks } = useSavedTracksQuery();

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
