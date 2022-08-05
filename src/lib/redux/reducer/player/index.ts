import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Track {
    id: string | null;
    uri: string;
    name: string;
    album: Spotify.Album;
    artists: Spotify.Artist[];
}

interface PlayerState {
    paused: boolean;
    repeat_mode: 0 | 1 | 2;
    shuffle: boolean;
    duration: number;
    progress_ms: number | null;
    currentTrack: Track | null;
    currentContext: string | null;
}

const initialState: PlayerState = {
    paused: true,
    repeat_mode: 0,
    shuffle: false,
    duration: 0,
    progress_ms: null,
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
        setRepeatMode: (state, action: PayloadAction<0 | 1 | 2>) => {
            state.repeat_mode = action.payload;
        },
        setShuffle: (state, action: PayloadAction<boolean>) => {
            state.shuffle = action.payload;
        },
        setProgress: (state, action: PayloadAction<number | null>) => {
            state.progress_ms = action.payload;
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
        increaseProgress: state => {
            state.progress_ms = state.progress_ms !== null ? state.progress_ms + 1000 : 1000;
        },
    },
});

export const {
    setPaused,
    setRepeatMode,
    setShuffle,
    setProgress,
    setDuration,
    setCurrentTrack,
    setCurrentContext,
    increaseProgress,
} = playerSlice.actions;
export default playerSlice.reducer;
