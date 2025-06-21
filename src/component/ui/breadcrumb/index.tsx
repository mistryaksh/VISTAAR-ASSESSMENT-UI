import type { FC } from "react";
import { Link } from "react-router-dom"; // Or use <a> if you want

export interface IBreadcrumbProps {
     links: {
          label: string;
          to: string;
          lastActive?: boolean;
     }[];
}

export const Breadcrumb: FC<IBreadcrumbProps> = ({ links }) => {
     if (!links?.length) return null;

     return (
          <nav className="flex mt-1" aria-label="Breadcrumb">
               <ol className="inline-flex items-center space-x-1 md:space-x-0">
                    {links.map((link, idx) => {
                         const isLast = idx === links.length - 1;
                         return (
                              <li
                                   key={link.to}
                                   className="inline-flex items-center"
                              >
                                   {idx !== 0 && (
                                        <span className="mx-1 text-gray-400">
                                             /
                                        </span>
                                   )}
                                   {isLast || link.lastActive ? (
                                        <span className="ml-1 text-gray-700 md:ml-0">
                                             {link.label}
                                        </span>
                                   ) : (
                                        <Link
                                             to={link.to}
                                             className="ml-1 text-primary-500 text-gray-900 hover:text-indigo-800 md:ml-1"
                                        >
                                             {link.label}
                                        </Link>
                                   )}
                              </li>
                         );
                    })}
               </ol>
          </nav>
     );
};
