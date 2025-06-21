import { createApi } from "@reduxjs/toolkit/query/react";
import { useServer } from "../../utils";
import type { ICustomerProps, ITableResponseProps } from "../../interface";

const customerApi = createApi({
     baseQuery: useServer,
     reducerPath: "customerApi",
     endpoints: (builder) => ({
          getAllCustomer: builder.query<
               { data: ITableResponseProps<ICustomerProps[]> },
               {
                    page?: number;
                    limit?: number;
               }
          >({
               query: ({ limit, page }) => {
                    return {
                         url: `/customers?page=${page}&limit=${limit}`,
                         method: "GET",
                    };
               },
          }),
     }),
});

export const {
     reducer: customerApiReducer,
     middleware: customerApiMiddleware,

     useGetAllCustomerQuery,
     useLazyGetAllCustomerQuery,
} = customerApi;
