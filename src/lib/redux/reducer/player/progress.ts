import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
    dragging: boolean;
    progress_ms: number | null;
}

const initialState: ProgressState = {
    dragging: false,
    progress_ms: null,
};

const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        setDragging: (state, action: PayloadAction<boolean>) => {
            state.dragging = action.payload;
        },
        setProgress: (state, action: PayloadAction<number | null>) => {
            if (state.dragging) {
                return;
            }

            state.progress_ms = action.payload;
        },
        setDraggingProgress: (state, action: PayloadAction<number | null>) => {
            state.progress_ms = action.payload;
        },
        increaseProgress: state => {
            if (state.dragging) {
                return;
            }

            state.progress_ms = state.progress_ms !== null ? state.progress_ms + 1000 : 1000;
        },
    },
});

export const { setDragging, setProgress, setDraggingProgress, increaseProgress } =
    progressSlice.actions;
export default progressSlice.reducer;
