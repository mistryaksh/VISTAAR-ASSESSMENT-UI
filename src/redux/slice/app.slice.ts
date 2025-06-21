import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export interface AppSliceProps {
     token: string | null;
}

const initialState: AppSliceProps = {
     token: null,
};

const appSlice = createSlice({
     name: "app",
     initialState,
     reducers: {
          setToken: (state, action: PayloadAction<string | null>) => {
               state.token = action.payload;
          },
     },
});

export const useAppSlice = () =>
     useSelector((state: RootState) => {
          return state.app;
     });
export const appReducer = appSlice.reducer;
export const { setToken } = appSlice.actions;
