import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './reducers/contactReducer';

export const store = configureStore({
  reducer: {
    contactReducer: contactReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;               