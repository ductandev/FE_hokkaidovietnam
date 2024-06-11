import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configStore";
import { CartDefaultState, initialState } from "../reducers/cartReducer";

const selectSlice = (state: RootState) => state.cartReducer || initialState;

export const selectCart = createSelector(
    [selectSlice],
    (state: CartDefaultState) => state.cart,
);