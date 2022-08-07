import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
    dragging: boolean;
    muted: boolean;
    volume: number;
}

const initialState: ProgressState = {
    dragging: false,
    muted: false,
    volume: 1,
};

const volumeSlice = createSlice({
    name: "volume",
    initialState,
    reducers: {
        setDragging: (state, action: PayloadAction<boolean>) => {
            state.dragging = action.payload;
        },
        setMuted: (state, action: PayloadAction<boolean>) => {
            state.muted = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
    },
});

export const { setDragging, setMuted, setVolume } = volumeSlice.actions;
export default volumeSlice.reducer;
