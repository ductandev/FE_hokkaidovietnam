import { configureStore } from '@reduxjs/toolkit';



export const store = configureStore({
  reducer: {

  }
});

// ============= Lấy ra kiểu dữ liệu của store ============
export type RootState = ReturnType<typeof store.getState>       //useSelector

export type DispatchType = typeof store.dispatch;               //useDispatch