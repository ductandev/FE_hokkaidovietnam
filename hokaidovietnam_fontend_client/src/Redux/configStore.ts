import { configureStore } from '@reduxjs/toolkit';

import contactReducer from './reducers/contactReducer';
import { cartReducer } from './reducers/cartReducer';

export const store = configureStore({
  reducer: {
    contactReducer: contactReducer,
    cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;