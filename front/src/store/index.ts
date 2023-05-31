import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice/chatSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
