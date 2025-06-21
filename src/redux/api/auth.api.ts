import { createApi } from "@reduxjs/toolkit/query/react";
import { useServer } from "../../utils";
import type { IUserProps } from "../../interface";

const authApi = createApi({
     baseQuery: useServer,
     reducerPath: "authApi",
     endpoints: (builder) => ({
          profile: builder.query<{ data: IUserProps }, void>({
               query: () => {
                    return {
                         url: "/auth/profile",
                         method: "GET",
                    };
               },
          }),
     }),
});

export const {
     reducer: authApiReducer,
     middleware: authApiMiddleware,

     useLazyProfileQuery,
     useProfileQuery,
} = authApi;
