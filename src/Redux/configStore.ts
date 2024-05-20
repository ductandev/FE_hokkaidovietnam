import { configureStore } from '@reduxjs/toolkit';

import contactReducer from './reducers/contactReducer';

import { cartReducer } from './reducers/cartReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    contactReducer: contactReducer,
    cartReducer,
    userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;