import React from "react";
import clsx from "clsx";

export interface HeadCell<T> {
     id: keyof T;
     label: string;
     width?: number;
     align?: "left" | "center" | "right";
     renderCell?: (row: T) => React.ReactNode;
}

export interface ServerPagination {
     page: number;
     limit: number;
     total: number;
     totalPages: number;
     length: number;
}

export interface DataTableProps<T> {
     headCell: HeadCell<T>[];
     tableData: T[];
     pagination: ServerPagination;
     onPageChange: (newPage: number) => void;
     loading?: boolean;
     showPagination?: boolean;
}

export function DataTable<T extends object>({
     headCell,
     tableData,
     pagination,
     onPageChange,
     showPagination,
     loading = false,
}: DataTableProps<T>) {
     return (
          <div className="bg-white rounded-lg border-x border-dashed border-gray-200 overflow-x-auto">
               <table className="min-w-full border-separate border-spacing-0 text-sm">
                    <thead className="bg-gray-300">
                         <tr>
                              {headCell.map(({ id, label, align, width }) => (
                                   <th
                                        key={String(id)}
                                        className={clsx(
                                             "bg-primary-50 text-primary-700 p-3 border-b border-gray-200",
                                             align === "center" &&
                                                  "text-center",
                                             align === "right" && "text-right",
                                             align === "left" && "text-left"
                                        )}
                                        style={width ? { width } : {}}
                                   >
                                        {label}
                                   </th>
                              ))}
                         </tr>
                    </thead>
                    <tbody>
                         {loading ? (
                              <tr>
                                   <td
                                        colSpan={headCell.length}
                                        className="py-8 text-center text-primary-500"
                                   >
                                        Loading...
                                   </td>
                              </tr>
                         ) : tableData.length === 0 ? (
                              <tr>
                                   <td
                                        colSpan={headCell.length}
                                        className="py-8 text-center text-gray-400"
                                   >
                                        No data available.
                                   </td>
                              </tr>
                         ) : (
                              tableData.map((row, rowIndex) => (
                                   <tr key={rowIndex} className="table-row">
                                        {headCell.map((cell) => (
                                             <td
                                                  key={String(cell.id)}
                                                  className={clsx(
                                                       "p-3 border-b border-dashed border-primary-100",
                                                       cell.align ===
                                                            "center" &&
                                                            "text-center",
                                                       cell.align === "right" &&
                                                            "text-right",
                                                       cell.align === "left" &&
                                                            "text-left"
                                                  )}
                                             >
                                                  {cell.renderCell
                                                       ? cell.renderCell(row)
                                                       : (row[
                                                              cell.id
                                                         ] as React.ReactNode) ??
                                                         "-"}
                                             </td>
                                        ))}
                                   </tr>
                              ))
                         )}
                    </tbody>
               </table>
               {/* Pagination */}
               {showPagination && (
                    <div className="flex items-center justify-between px-4 py-2 bg-primary-50 border-t border-gray-100">
                         <button
                              className="px-3 py-1 rounded border text-sm bg-white hover:bg-primary-100 text-primary-700 disabled:opacity-50"
                              disabled={pagination.page === 1}
                              onClick={() => onPageChange(pagination.page - 1)}
                         >
                              Prev
                         </button>
                         <span className="text-sm">
                              Page <b>{pagination.page}</b> of{" "}
                              <b>{pagination.totalPages}</b>
                         </span>
                         <button
                              className="px-3 py-1 rounded border text-sm bg-white hover:bg-primary-100 text-primary-700 disabled:opacity-50"
                              disabled={
                                   pagination.page === pagination.totalPages
                              }
                              onClick={() => onPageChange(pagination.page + 1)}
                         >
                              Next
                         </button>
                    </div>
               )}
          </div>
     );
}
