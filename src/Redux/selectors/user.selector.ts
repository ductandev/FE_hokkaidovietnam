import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../configStore";
import { userDefaultState, initialState } from "../reducers/userReducer";

const selectSlice = (state: RootState) => state.userReducer || initialState;

export const selectUser = createSelector(
    [selectSlice],
    (state: userDefaultState) => state.user,
);