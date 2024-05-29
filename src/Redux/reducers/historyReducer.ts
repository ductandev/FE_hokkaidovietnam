import { http } from '@/Util/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface OrderClientHistory {
  don_hang_id: number;
  san_pham_id: number;
  so_luong: number;
  don_gia: number;
  tong_tien: number;
  thoi_gian_dat_hang: Date;
  hinh_anh: string;
  ten_san_pham: string;
  trang_thai_don_hang_id: number;
}

export interface HistoryState {
  orderHistory: OrderClientHistory[];
  isLoadingOrderHistory: boolean;
}

const initialState: HistoryState = {
  orderHistory: [],
  isLoadingOrderHistory: false
}

const historyReducer = createSlice({
  name: "historyReducer",
  initialState,
  reducers: {},
  // {
  //   setOrderHistory: (state, action) => {
  //     state.orderHistory = action.payload;
  //   }
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getOrerHistoryAsyncAction.pending, (state) => {
        state.isLoadingOrderHistory = true
      })
      .addCase(getOrerHistoryAsyncAction.fulfilled, (state, action) => {
        state.isLoadingOrderHistory = false
        state.orderHistory = action.payload;
      })
      .addCase(getOrerHistoryAsyncAction.rejected, (state) => {
        state.isLoadingOrderHistory = false
      })
  }
});

// export const { } = historyReducer.actions

export default historyReducer.reducer

//==================Async Action======================
export const getOrerHistoryAsyncAction = createAsyncThunk(
  "getOrerHistoryAsyncAction",
  async (userID: number) => {
    try {
      // const res = await http.get(`/api/user/${userID}`)
      const res = await http.get(`/api/user/order/history/${userID}`)
      return res.data.content;
    } catch (err) {
      console.log("🚀 ~ file: historyReducer.ts:77 ~ err:", err);
      throw err;
    }
  }
);
