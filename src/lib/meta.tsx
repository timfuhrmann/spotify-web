import React from "react";
import Head from "next/head";
import { useCurrentTrackSelector } from "@lib/redux/reducer/player/hook/useCurrentTrackSelector";

interface MetaProps {
    title: string;
    description?: string;
}

export const Meta: React.FC<MetaProps> = ({ title, description }) => {
    const { paused, currentTrack } = useCurrentTrackSelector();

    const currentTitle =
        currentTrack && !paused
            ? `${currentTrack.name} • ${currentTrack.artists.map(artist => artist.name).join(", ")}`
            : "Spotify - " + title;

    return (
        <Head>
            <title>{currentTitle}</title>
            {title && <meta name="title" content={"Spotify - " + title} />}
            {description && <meta name="description" content={description} />}
        </Head>
    );
};
