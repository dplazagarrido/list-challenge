import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import pokeReducer from "./slices/pokeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    poke: pokeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
