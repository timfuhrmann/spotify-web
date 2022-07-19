import React from "react";
import { SavedTracksProvider } from "./SavedTracksProvider";
import { ListHead } from "../shared/ListHead/ListHead";
import { SavedTracksHeadFooter } from "./SavedTracksHeadFooter";
import { useDominantColor } from "@lib/hook/useDominantColor";

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

export const SavedTracks: React.FC = () => {
    useDominantColor(images);

    return (
        <SavedTracksProvider>
            <ListHead
                overline="Playlist"
                name="Liked Songs"
                images={images}
                renderFooter={<SavedTracksHeadFooter />}
            />
        </SavedTracksProvider>
    );
};
