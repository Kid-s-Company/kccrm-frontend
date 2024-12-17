import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {themeSlice} from "../../features/theme/themeSlice.ts";
import {authSlice} from "../../features/account/authSlice.ts";

export const store = configureStore(
    {
        reducer: {
            theme: themeSlice.reducer,
            auth: authSlice.reducer,
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;