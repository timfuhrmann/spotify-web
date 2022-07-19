import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../../src/components/layout/PrimaryLayout";
import { SavedTracks } from "../../src/components/saved-tracks/SavedTracks";
import { useSession } from "@lib/context/session";

const Tracks: NextPageWithLayout = () => {
    const { session } = useSession();

    if (!session) {
        return null;
    }

    return <SavedTracks />;
};

// eslint-disable-next-line react/display-name
Tracks.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Tracks;
