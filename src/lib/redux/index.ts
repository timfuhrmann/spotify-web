import rootReducer from "./reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const middleware: Middleware[] = [thunk as ThunkMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
