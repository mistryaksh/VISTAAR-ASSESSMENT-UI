import clsx from "clsx";
import type { FC } from "react";

export interface IButtonProps {}

export const Button: FC<
     React.DetailedHTMLProps<
          React.ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
     > &
          IButtonProps
> = ({ children, ...rest }) => {
     return (
          <button
               {...rest}
               className={clsx(
                    "py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-md cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
               )}
          >
               {children}
          </button>
     );
};
