import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface User {
    nguoi_dung_id: string,
    vai_tro_id: string,
    ho_ten: string,
    email: string,
    mat_khau?: string,
    dia_chi: string,
    phuong_id: string,
    quan_id: string,
    tinh_thanh_id: string,
    so_dien_thoai: string,
    anh_dai_dien: string,
    gioi_tinh: string,
    isDelete: boolean
}
export interface userDefaultState {
    user: User | any
}

export const initialState: userDefaultState = {
    user: {
        email: "",
        ho_ten: "",
        so_dien_thoai: "",
        dia_chi: "",
        tinh_thanh_id: "",
        quan_id: "",
        phuong_id: "",
    }
}

export const userSlice = createSlice({
    name: 'UserReducer',
    initialState,
    reducers: {
        setUser: (state: any, action: PayloadAction<any>) => {
            return { ...state, user: action.payload }
        },
    },
})

export const userReducer = userSlice.reducer