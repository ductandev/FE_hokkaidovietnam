import { configureStore } from '@reduxjs/toolkit';

import contactReducer from './reducers/contactReducer';
import historyReducer from './reducers/historyReducer';

import { cartReducer } from './reducers/cartReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    contactReducer: contactReducer,
    historyReducer: historyReducer,
    cartReducer,
    userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;