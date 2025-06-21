import { useCallback, useEffect, useState } from "react";
import { useLazyGetAllCustomerQuery } from "../../redux/api/customer.api";
import { useReduxErrorHandler } from "../../hooks";
import {
     Alert,
     Breadcrumb,
     Button,
     DataTable,
     Modal,
     type HeadCell,
} from "../../component";
import { RxCross1 } from "react-icons/rx";
import type {
     ICustomerProps,
     ITableResponseProps,
     ITransactionProps,
} from "../../interface";
import { useAppDispatch } from "../../redux";
import {
     setAccountBucketData,
     setAccountId,
     setCustomerDetails,
     setFilterType,
     useCustomerSlice,
} from "../../redux/slice";
import { Field, Select } from "@headlessui/react";
import clsx from "clsx";
import { useLazyGetTransactionByAccountQuery } from "../../redux/api/transaction.api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import moment from "moment";
import { GrTransaction } from "react-icons/gr";

export const CustomerListPage = () => {
     const [GetCustomers, { data, isLoading, isError, error }] =
          useLazyGetAllCustomerQuery();
     const [
          GetTransactions,
          {
               data: transactions,
               isLoading: isTransactionLoading,
               isError: isTransactionError,
               error: transactionError,
               isSuccess: isTransactionSuccess,
          },
     ] = useLazyGetTransactionByAccountQuery();
     const errorText = useReduxErrorHandler(isError, error);
     const transactionErrorText = useReduxErrorHandler(
          isTransactionError,
          transactionError
     );

     const [page, setPage] = useState(1);
     const [pageLimit, setPageLimit] = useState(10);
     const [transactionPage, setTransactionPage] = useState(1);
     const transactionRowsPerPage = 10;

     const dispatch = useAppDispatch();
     const { details, filterType, selectedAccountId, transactionData } =
          useCustomerSlice();

     useEffect(() => {
          if (selectedAccountId) {
               GetTransactions(selectedAccountId);
          }
     }, [selectedAccountId, GetTransactions]);

     useEffect(() => {
          if (isTransactionSuccess && transactions) {
               const transactionSetup: ITableResponseProps<ITransactionProps> =
                    {
                         data:
                              (transactions.data
                                   .transactions as unknown as ITransactionProps[]) ||
                              [],
                         length: transactions?.data.transaction_count ?? 0,
                         total: transactions?.data.transaction_count ?? 0,
                         limit: pageLimit,
                         page,
                         totalPages: Math.ceil(
                              transactions?.data.transaction_count / pageLimit
                         ),
                    };
               dispatch(setAccountBucketData(transactionSetup));
          }
     }, [isTransactionSuccess, transactions, dispatch, page, pageLimit]);

     useEffect(() => {
          GetCustomers({ page, limit: pageLimit });
     }, [GetCustomers, page, pageLimit]);

     const handlePageChange = (newPage: number) => {
          setPage(newPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
     };

     const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setPageLimit(Number(e.target.value));
          setPage(1);
     };

     const onAccountSelect = useCallback(
          (account: number) => dispatch(setAccountId(account)),
          [dispatch]
     );

     const customerHeadCell: HeadCell<ICustomerProps>[] = [
          { id: "name", label: "Name", align: "left", width: 200 },
          { id: "address", label: "Address", align: "left" },
          {
               id: "active",
               label: "Status",
               align: "center",
               renderCell: (row) =>
                    row.active ? (
                         <p className="text-green-500">Active</p>
                    ) : (
                         <p className="text-red-500">Inactive</p>
                    ),
          },
          {
               id: "accounts",
               label: "Accounts",
               align: "right",
               renderCell: (row) => {
                    return (
                         <div className="flex justify-end">
                              <button
                                   type="button"
                                   className="z-50 bg-primary-500 px-2 py-1 rounded-md cursor-pointer flex items-center gap-2"
                                   onClick={() =>
                                        dispatch(setCustomerDetails(row))
                                   }
                              >
                                   <GrTransaction size={20} />
                                   <span className="block">Accounts</span>
                              </button>
                         </div>
                    );
               },
          },
     ];

     const customerTableData: ICustomerProps[] =
          (data?.data?.data as unknown as ICustomerProps[])?.filter((props) => {
               if (filterType === "all") return true;
               if (filterType === "active") return props.active;
               if (filterType === "inactive") return !props.active;
               return true;
          }) ?? [];

     const paginatedTransactions = transactionData?.data
          ? (transactionData.data as unknown as ITransactionProps[]).slice(
                 (transactionPage - 1) * transactionRowsPerPage,
                 transactionPage * transactionRowsPerPage
            )
          : [];
     const totalTransactionPages = transactionData?.data
          ? Math.ceil(
                 (transactionData.data as unknown as ITransactionProps[])
                      .length / transactionRowsPerPage
            )
          : 1;
     const transactionHeadCell: HeadCell<ITransactionProps>[] = [
          {
               id: "symbol",
               label: "Symbol",
               align: "left",
               width: 100,
          },
          {
               id: "date",
               label: "Date",
               renderCell: (row) => (
                    <p className="text-gray-500">
                         {moment(row.date).format("lll")}
                    </p>
               ),
               align: "left",
          },
          {
               id: "price",
               label: "Price",
               renderCell: (row) => parseInt(row.price).toFixed(2),
               align: "right",
          },
          {
               id: "total",
               label: "Total Price",
               renderCell: (row) => parseInt(row.total).toFixed(2),
               align: "right",
          },
     ];

     return (
          <div>
               <div className="flex items-center justify-between">
                    <div>
                         <h1 className="text-2xl">Customers</h1>
                         <Breadcrumb
                              links={[
                                   { label: "Dashboard", to: "/" },
                                   {
                                        label: "Customers",
                                        to: "/customers",
                                        lastActive: true,
                                   },
                              ]}
                         />
                    </div>
                    <div>
                         <Field>
                              <div className="relative">
                                   <Select
                                        value={filterType}
                                        onChange={(e) => {
                                             dispatch(
                                                  setFilterType(
                                                       e.target.value as
                                                            | "all"
                                                            | "active"
                                                            | "inactive"
                                                  )
                                             );
                                        }}
                                        className={clsx(
                                             " px-5 py-2 border border-gray-300 rounded-md focus:outline-none"
                                        )}
                                   >
                                        <option value="all">All</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                             Inactive
                                        </option>
                                   </Select>
                              </div>
                         </Field>
                    </div>
               </div>
               {errorText && (
                    <Alert type="error" value={errorText} Icon={RxCross1} />
               )}

               <div className="mt-6">
                    <DataTable<ICustomerProps>
                         headCell={customerHeadCell}
                         tableData={customerTableData}
                         pagination={{
                              page: data?.data?.page ?? 1,
                              limit: data?.data?.limit ?? 10,
                              total: data?.data?.total ?? 0,
                              totalPages: data?.data?.totalPages ?? 1,
                              length: data?.data?.length ?? 0,
                         }}
                         onPageChange={handlePageChange}
                         loading={isLoading}
                         showPagination
                    />
               </div>

               <div className="mt-3 flex items-center justify-end gap-2">
                    <label htmlFor="rowLimit" className="text-sm">
                         Rows per page:
                    </label>
                    <select
                         id="rowLimit"
                         value={pageLimit}
                         onChange={handleLimitChange}
                         className="border rounded px-2 py-1 text-sm"
                         disabled={isLoading}
                    >
                         {[10, 20, 50, 100].map((num) => (
                              <option value={num} key={num}>
                                   {num}
                              </option>
                         ))}
                    </select>
               </div>
               {details && (
                    <Modal
                         modalTitle={`Accounts of ${details.name}`}
                         isOpen={!!details}
                         setIsOpen={() => dispatch(setCustomerDetails(null))}
                         actions={[
                              <Button
                                   onClick={() => {
                                        dispatch(setCustomerDetails(null));
                                        dispatch(setAccountBucketData(null));
                                        setTransactionPage(1);
                                        dispatch(setAccountId(null));
                                   }}
                              >
                                   <span>Close</span>
                              </Button>,
                         ]}
                    >
                         <div>
                              {transactionErrorText && (
                                   <Alert
                                        type="error"
                                        value={transactionErrorText}
                                        Icon={RxCross1}
                                   />
                              )}
                              <div className="flex gap-2 flex-wrap">
                                   {details.accounts.map((account, index) => (
                                        <div
                                             onClick={() =>
                                                  onAccountSelect(account)
                                             }
                                             className={clsx(
                                                  "cursor-pointer px-3 text-sm py-1 rounded-md",
                                                  selectedAccountId === account
                                                       ? "bg-primary-500"
                                                       : "bg-gray-200"
                                             )}
                                             key={index + account}
                                        >
                                             <p key={account}>#{account}</p>
                                        </div>
                                   ))}
                              </div>
                              {selectedAccountId && transactionData && (
                                   <div className="my-5">
                                        {isTransactionLoading && (
                                             <AiOutlineLoading3Quarters className="animate-spin" />
                                        )}
                                        <h6 className="mb-5 text-xl">
                                             Transactions List
                                        </h6>
                                        {!isTransactionLoading &&
                                             transactionData && (
                                                  <div className="">
                                                       <DataTable<ITransactionProps>
                                                            headCell={
                                                                 transactionHeadCell
                                                            }
                                                            tableData={
                                                                 (paginatedTransactions as unknown as ITransactionProps[]) ||
                                                                 []
                                                            }
                                                            pagination={
                                                                 transactionData
                                                            }
                                                            onPageChange={() =>
                                                                 null
                                                            }
                                                       />
                                                  </div>
                                             )}
                                        {transactionData?.data && (
                                             <div className="flex items-center justify-between px-4 py-2 bg-primary-50 border-t border-gray-100">
                                                  <button
                                                       className="px-3 py-1 rounded border text-sm bg-white hover:bg-primary-100 text-primary-700 disabled:opacity-50"
                                                       disabled={
                                                            transactionPage ===
                                                            1
                                                       }
                                                       onClick={() =>
                                                            setTransactionPage(
                                                                 (p) =>
                                                                      Math.max(
                                                                           p -
                                                                                1,
                                                                           1
                                                                      )
                                                            )
                                                       }
                                                  >
                                                       Prev
                                                  </button>
                                                  <span className="text-sm">
                                                       Page{" "}
                                                       <b>{transactionPage}</b>{" "}
                                                       of{" "}
                                                       <b>
                                                            {
                                                                 totalTransactionPages
                                                            }
                                                       </b>
                                                  </span>
                                                  <button
                                                       className="px-3 py-1 rounded border text-sm bg-white hover:bg-primary-100 text-primary-700 disabled:opacity-50"
                                                       disabled={
                                                            transactionPage ===
                                                            totalTransactionPages
                                                       }
                                                       onClick={() =>
                                                            setTransactionPage(
                                                                 (p) =>
                                                                      Math.min(
                                                                           p +
                                                                                1,
                                                                           totalTransactionPages
                                                                      )
                                                            )
                                                       }
                                                  >
                                                       Next
                                                  </button>
                                             </div>
                                        )}
                                   </div>
                              )}
                              {!isTransactionLoading && !selectedAccountId && (
                                   <p className="text-gray-500 text-center mt-5 mb-10">
                                        Select account ID to view transactions
                                   </p>
                              )}
                         </div>
                    </Modal>
               )}
          </div>
     );
};
