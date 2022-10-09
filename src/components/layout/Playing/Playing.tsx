import React from "react";
import { PlayingProvider } from "./PlayingProvider";
import { PlayingBar } from "./PlayingBar";

export const Playing: React.FC = () => {
    return (
        <PlayingProvider>
            <PlayingBar />
            {/* Remove support of devices because of spotify connect issues */}
            {/*<PlayingDevice />*/}
        </PlayingProvider>
    );
};
