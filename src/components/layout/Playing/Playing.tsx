import React from "react";
import { PlayingProvider } from "./PlayingProvider";
import { PlayingBar } from "./PlayingBar";
import { PlayingDevice } from "./PlayingDevice";

export const Playing: React.FC = () => {
    return (
        <PlayingProvider>
            <PlayingBar />
            <PlayingDevice />
        </PlayingProvider>
    );
};
