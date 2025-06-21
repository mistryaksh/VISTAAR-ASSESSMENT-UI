import type { FC } from "react";
import {
     Description,
     Dialog,
     DialogPanel,
     DialogTitle,
} from "@headlessui/react";
import type React from "react";

export interface IAppModalProps {
     isOpen: boolean;
     setIsOpen: (open: boolean) => void;
     children: React.ReactNode;
     modalTitle: string;
     description?: string;
     actions: React.JSX.Element[];
}

export const Modal: FC<IAppModalProps> = ({
     isOpen,
     children,
     modalTitle,
     description,
     actions,
}) => {
     return (
          <Dialog open={isOpen} onClose={() => null} className="relative z-50">
               <div className="fixed inset-0 flex w-screen items-center justify-center bg-gray-950/50 p-4">
                    <DialogPanel className="max-w-4xl w-full rounded-md bg-white p-6">
                         <DialogTitle className="text-2xl font-semibold pb-5">
                              {modalTitle}
                         </DialogTitle>
                         {description && (
                              <Description>{description}</Description>
                         )}
                         <div className="h-auto ">{children}</div>
                         <div className="flex gap-4 justify-end pt-5">
                              {actions && actions.map((action) => action)}
                         </div>
                    </DialogPanel>
               </div>
          </Dialog>
     );
};
