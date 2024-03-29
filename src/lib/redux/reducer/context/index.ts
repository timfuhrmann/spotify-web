import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContextState {
    context_uri: string | null;
    name: string | null;
}

const initialState: ContextState = {
    context_uri: null,
    name: null,
};

const contextSlice = createSlice({
    name: "context",
    initialState,
    reducers: {
        setContext: (state, { payload }: PayloadAction<ContextState>) => {
            state.context_uri = payload.context_uri;
            state.name = payload.name;
        },
        resetContext: state => {
            state.context_uri = null;
            state.name = null;
        },
    },
});

export const { setContext, resetContext } = contextSlice.actions;
export default contextSlice.reducer;
