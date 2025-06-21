import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomerListPage, DashboardPage } from "./pages";
import { Provider } from "react-redux";
import { persistor, store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { Layout } from "./layout";

export default function App() {
     return (
          <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                         <Routes>
                              <Route element={<Layout />}>
                                   <Route
                                        path="/"
                                        element={<DashboardPage />}
                                   />
                                   <Route
                                        path="/customers"
                                        element={<CustomerListPage />}
                                   />
                              </Route>
                         </Routes>
                    </BrowserRouter>
               </PersistGate>
          </Provider>
     );
}
