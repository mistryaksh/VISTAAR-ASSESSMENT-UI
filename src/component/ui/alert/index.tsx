import clsx from "clsx";
import type { FC } from "react";
import type { IconType } from "react-icons";

export interface IAlertProps {
     value: string;
     Icon: IconType;
     type: "success" | "error" | "warning";
}

export const Alert: FC<IAlertProps> = ({ Icon, value, type }) => {
     const isSuccess = type === "success";
     const isWarning = type === "warning";
     const isError = type === "error";
     return (
          <div
               className={clsx(
                    "rounded-lg py-5 px-6 flex items-center gap-5",
                    isError && "bg-red-100",
                    isSuccess && "bg-green-100",
                    isWarning && "bg-yelllow-100"
               )}
          >
               <Icon
                    className={clsx(
                         isError && "text-red-500",
                         isSuccess && "text-green-500",
                         isWarning && "text-yellow-500"
                    )}
               />
               <span
                    className={clsx(
                         "block",
                         isError && "text-red-500",
                         isSuccess && "text-green-500",
                         isWarning && "text-yellow-500"
                    )}
               >
                    {value}
               </span>
          </div>
     );
};
