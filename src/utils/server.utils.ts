import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../redux";

export const useServer = fetchBaseQuery({
     baseUrl: import.meta.env.VITE_API_URL,
     prepareHeaders: (headers, api) => {
          const token: string = (api.getState() as RootState).app
               .token as string;
          if (token) {
               headers.set("Authorization", `Bearer ${token}`);
          }
     },
});
