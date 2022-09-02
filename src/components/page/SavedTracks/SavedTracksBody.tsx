import React from "react";
import { ListBody } from "../../shared/ListBody";
import { ListControls } from "../../shared/ListControls/ListControls";
import { SavedTracksList } from "./SavedTracksList";
import { useSavedTracks } from "./SavedTracksProvider";

export const SavedTracksBody: React.FC = () => {
    const { handlePlay } = useSavedTracks();

    return (
        <ListBody>
            <ListControls hideFollow onPlay={handlePlay} />
            <SavedTracksList />
        </ListBody>
    );
};
