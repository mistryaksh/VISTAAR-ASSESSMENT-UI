import { useState, useEffect } from "react";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function useReduxErrorHandler(
     isError: boolean,
     error: FetchBaseQueryError | SerializedError | undefined
) {
     const [errorMessage, setErrorMessage] = useState<string>("");

     useEffect(() => {
          if (isError && error) {
               let message = "Something went wrong. Please try again!";

               if ("status" in error && typeof error.status === "number") {
                    if (
                         typeof error.data === "object" &&
                         error.data &&
                         "message" in error.data
                    ) {
                         message = (error.data as any).message;
                    } else if (typeof error.data === "string") {
                         message = error.data;
                    } else if (error.data === "FETCH_ERROR") {
                         message =
                              "Network error. Please check your connection.";
                    }
               }
               // RTK Query: SerializedError (fallback)
               else if (
                    "message" in error &&
                    typeof error.message === "string"
               ) {
                    message = error.message;
               } else if (typeof error === "string") {
                    message = error;
               }

               setErrorMessage(message);
          } else if (!isError) {
               setErrorMessage("");
          }
     }, [isError, error]);

     return errorMessage;
}
