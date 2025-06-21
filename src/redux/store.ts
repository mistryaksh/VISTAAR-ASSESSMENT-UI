import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appReducer, customerReducer } from "./slice";
import { authApiMiddleware, authApiReducer } from "./api/auth.api";
import { customerApiMiddleware, customerApiReducer } from "./api/customer.api";
import {
     transactionApiMiddleware,
     transactionApiReducer,
} from "./api/transaction.api";

const persistConfig = {
     key: "root",
     storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
     reducer: combineReducers({
          app: persistedReducer,
          customer: customerReducer,
          authApi: authApiReducer,
          customerApi: customerApiReducer,
          transactionApi: transactionApiReducer,
     }),
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck: false }).concat([
               authApiMiddleware,
               customerApiMiddleware,
               transactionApiMiddleware,
          ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const persistor = persistStore(store);
setupListeners(store.dispatch);
