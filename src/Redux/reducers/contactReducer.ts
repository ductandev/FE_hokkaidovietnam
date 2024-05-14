import { UserContactFrm } from '@/Pages/Contact';
import { httpNonAuth } from '@/Util/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ToastOptions, toast } from 'react-toastify';


const toastOptions: ToastOptions<{}> = {
  position: "top-center",
  autoClose: 400,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export interface UserState {
  isLoadingContact: boolean;
}

const initialState: UserState = {
  isLoadingContact: false
}

const contactReducer = createSlice({
  name: 'contactReducer',
  initialState,
  reducers: {},
  /*
    Các trạng thái của 1 action api
    + pending: Khi api đang được thực hiện
    + fulfilled: khi kết quả api trả về thành công
    + rejected: Khi kết quả api trả về thất bại
  */
  extraReducers: (builder) => {
    builder
      .addCase(contactAsyncAction.pending, (state) => {
        state.isLoadingContact = true;
      })
      .addCase(contactAsyncAction.fulfilled, (state) => {
        state.isLoadingContact = false;
      })
      .addCase(contactAsyncAction.rejected, (state) => {
        state.isLoadingContact = false;
      })
  },
})


// export const { } = contactReducer.actions

export default contactReducer.reducer

// =================Async Action===================
export const contactAsyncAction = createAsyncThunk("contactAsyncAction", async (userContact: UserContactFrm) => {
  try {
    const res = await httpNonAuth.post("/api/contact", userContact);
    toast.success('Gửi thông tin liên hệ thành công!', toastOptions);
    return res.data.content;

  } catch (err) {
    toast.error('Gửi thông tin liên hệ thất bại!', toastOptions);
    console.log("🚀 ~ file: contactReducer.ts:41 ~ contactAsyncAction ~ err:", err);
    //đảm bảo lỗi được truyền đi
    throw err;
  }
})