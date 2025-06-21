import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "..";
import type {
     ICustomerProps,
     ITableResponseProps,
     ITransactionProps,
} from "../../interface";

export interface CustomerSliceProps {
     details: ICustomerProps | null;
     filterType: "all" | "active" | "inactive";
     selectedAccountId: number | null;
     transactionData: ITableResponseProps<ITransactionProps> | null;
}

const initialState: CustomerSliceProps = {
     details: null,
     filterType: "active",
     selectedAccountId: null,
     transactionData: null,
};
const customerSlice = createSlice({
     name: "customer",
     initialState,
     reducers: {
          setCustomerDetails: (
               state,
               action: PayloadAction<ICustomerProps | null>
          ) => {
               state.details = action.payload;
          },

          setFilterType: (
               state,
               action: PayloadAction<"all" | "active" | "inactive">
          ) => {
               state.filterType = action.payload;
          },
          setAccountId: (state, action: PayloadAction<number | null>) => {
               state.selectedAccountId = action.payload;
          },
          setAccountBucketData: (
               state,
               action: PayloadAction<ITableResponseProps<ITransactionProps> | null>
          ) => {
               state.transactionData = action.payload;
          },
     },
});

export const customerReducer = customerSlice.reducer;
export const {
     setCustomerDetails,
     setFilterType,
     setAccountId,
     setAccountBucketData,
} = customerSlice.actions;

export const useCustomerSlice = () =>
     useSelector((state: RootState) => state.customer);
