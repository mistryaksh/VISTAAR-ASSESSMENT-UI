import type React from "react";
import type { FC } from "react";
import type { IconType } from "react-icons";

export interface IconButtonProps {
     Icon: IconType;
}

export const IconButton: FC<
     IconButtonProps &
          React.DetailedHTMLProps<
               React.ButtonHTMLAttributes<HTMLButtonElement>,
               HTMLButtonElement
          >
> = ({ Icon, ...rest }) => {
     return (
          <button
               className="p-2 text-white rounded-md"
               style={{
                    backgroundColor: "var(--tw-color-primary-400)",
               }}
               {...rest}
          >
               <Icon size={26} />
          </button>
     );
};
