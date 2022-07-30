import React from "react";
import { SavedTracksProvider } from "./SavedTracksProvider";
import { ListHead } from "../../shared/ListHead/ListHead";
import { SavedTracksHeadFooter } from "./SavedTracksHeadFooter";
import { ListBody } from "../../shared/ListBody";
import { ListControls } from "../../shared/ListControls/ListControls";
import { SavedTracksList } from "./SavedTracksList";

const images = [
    {
        width: 64,
        height: 64,
        url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
    },
    {
        width: 150,
        height: 150,
        url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
    },
    {
        width: 300,
        height: 300,
        url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
    },
];

export interface SavedTracksProps {
    initialTracks: SpotifyApi.UsersSavedTracksResponse;
}

export const SavedTracks: React.FC<SavedTracksProps> = props => {
    return (
        <SavedTracksProvider {...props}>
            <ListHead
                overline="Playlist"
                name="Liked Songs"
                images={images}
                renderFooter={<SavedTracksHeadFooter />}
            />
            <ListBody>
                <ListControls hideFollow />
                <SavedTracksList />
            </ListBody>
        </SavedTracksProvider>
    );
};
