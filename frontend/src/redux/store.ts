import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import conversationReducer from "./conversationSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        conversation: conversationReducer,
        message: messageReducer,

    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;