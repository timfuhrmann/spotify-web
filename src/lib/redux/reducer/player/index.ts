import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RepeatMode = SpotifyApi.PlaybackObject["repeat_state"];

interface Track {
    id: string | null;
    uri: string;
    name: string;
    album: Spotify.Album;
    artists: Spotify.Artist[];
}

interface PlayerState {
    paused: boolean;
    repeat_mode: RepeatMode;
    shuffle: boolean;
    duration: number;
    currentTrack: Track | null;
    currentContext: string | null;
}

const initialState: PlayerState = {
    paused: true,
    repeat_mode: "off",
    shuffle: false,
    duration: 0,
    currentTrack: null,
    currentContext: null,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setPaused: (state, action: PayloadAction<boolean>) => {
            state.paused = action.payload;
        },
        setRepeatMode: (state, action: PayloadAction<RepeatMode>) => {
            state.repeat_mode = action.payload;
        },
        setShuffle: (state, action: PayloadAction<boolean>) => {
            state.shuffle = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        setCurrentTrack: (state, action: PayloadAction<Track | null>) => {
            state.currentTrack = action.payload;
        },
        setCurrentContext: (state, action: PayloadAction<string | null>) => {
            state.currentContext = action.payload;
        },
    },
});

export const {
    setPaused,
    setRepeatMode,
    setShuffle,
    setDuration,
    setCurrentTrack,
    setCurrentContext,
} = playerSlice.actions;
export default playerSlice.reducer;
