import { createApi } from "@reduxjs/toolkit/query/react";
import { useServer } from "../../utils";
import type { IAccountBucketProps } from "../../interface";

const transactionApi = createApi({
     baseQuery: useServer,
     reducerPath: "transactionApi",
     endpoints: (builder) => ({
          getTransactionByAccount: builder.query<
               { data: IAccountBucketProps },
               number
          >({
               query: (transactionId) => {
                    return {
                         url: `/transactions/${transactionId}`,
                         method: "GET",
                    };
               },
          }),
     }),
});

export const {
     reducer: transactionApiReducer,
     middleware: transactionApiMiddleware,

     useGetTransactionByAccountQuery,
     useLazyGetTransactionByAccountQuery,
} = transactionApi;
