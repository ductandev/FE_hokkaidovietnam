import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/Types/Product.type'

export interface CartDefaultState {
    cart: Array<Product>
}

export const initialState: CartDefaultState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'CartReducer',
    initialState,
    reducers: {
        setCart: (state: any, action: PayloadAction<any>) => {
            return { ...state, cart: action.payload }
        },
    },
})

export const cartReducer = cartSlice.reducer