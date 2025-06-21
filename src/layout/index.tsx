import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";
import { PiSpeedometerDuotone, PiUsersFourDuotone } from "react-icons/pi";
import type { IconType } from "react-icons";
import type { FC } from "react";

export const Layout: FC = () => {
     const sidebarLink: {
          label: string;
          to: string;
          icon: IconType;
     }[] = [
          { label: "Dashboard", to: "/", icon: PiSpeedometerDuotone },
          { label: "Customers", to: "/customers", icon: PiUsersFourDuotone },
     ];
     return (
          <main className="h-screen flex gap-2">
               <div
                    className="w-1/6 border-r border-dashed"
                    style={{
                         borderColor: "var(--tw-color-primary-400)",
                    }}
               >
                    <nav className="w-full h-full p-5 flex flex-col gap-2">
                         {sidebarLink.map(({ label, to, icon: Icon }) => (
                              <NavLink
                                   key={to}
                                   to={to}
                                   className={({ isActive }) =>
                                        clsx(
                                             "w-full gap-2.5 py-3 px-2 flex items-center justify-start rounded-md text-md font-semibold",
                                             isActive
                                                  ? "text-[var(--tw-color-primary-500)] bg-[var(--tw-color-primary-50)]"
                                                  : "text-gray-700 hover:bg-gray-50"
                                        )
                                   }
                                   // No need for extra state
                              >
                                   <Icon size={24} />
                                   {label}
                              </NavLink>
                         ))}
                    </nav>
               </div>
               <section className="flex-1/2">
                    <header>
                         <div className="py-3 px-5 flex justify-between items-center">
                              <div>
                                   <h6 className="font-semibold">
                                        VISTAAR MERN ASSESSMENT
                                   </h6>
                              </div>
                         </div>
                    </header>
                    <section className="px-5">
                         <Outlet />
                    </section>
               </section>
          </main>
     );
};
