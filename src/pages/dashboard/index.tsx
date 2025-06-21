import { useEffect, useState } from "react";
import { setToken, useAppSlice } from "../../redux/slice";
import { useAppDispatch } from "../../redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLazyProfileQuery } from "../../redux/api/auth.api";
import { useReduxErrorHandler } from "../../hooks";
import { ImCross } from "react-icons/im";
import { Alert, Button, IconButton } from "../../component";
import { MdContentCopy } from "react-icons/md";

export const DashboardPage = () => {
     const [
          Profile,
          {
               isLoading: isProfileLoading,
               isError: isProfileError,
               error: profileError,
               data: profile,
          },
     ] = useLazyProfileQuery();
     const errorText = useReduxErrorHandler(isProfileError, profileError);

     const [copied, setCopied] = useState<boolean>(false);
     const { token } = useAppSlice();
     const dispatch = useAppDispatch();
     const [param] = useSearchParams();
     const navigate = useNavigate();
     const paramToken = param.get("token");

     useEffect(() => {
          if (paramToken) {
               dispatch(setToken(paramToken));
               navigate(window.location.pathname, { replace: true });
          }
     }, [paramToken, dispatch, navigate]);

     useEffect(() => {
          if (!token && !paramToken) {
               window.location.replace(
                    `${import.meta.env.VITE_API_URL}/auth/google`
               );
          } else {
               Profile();
          }
     }, [token, paramToken, Profile]);

     return (
          <div>
               {errorText && (
                    <Alert value={errorText} type="error" Icon={ImCross} />
               )}

               {isProfileLoading && <div>Loading...</div>}

               {!isProfileLoading && (
                    <div>
                         <div className="text-2xl font-semibold">
                              Hey! Welcome {profile?.data.name}
                         </div>
                         <p className="text-gray-500">
                              Your email <span>{profile?.data.email}</span>
                         </p>

                         <div className="mt-5 flex items-center gap-5">
                              <Button
                                   type="button"
                                   onClick={() => navigate("/customers")}
                              >
                                   Show Assessment
                              </Button>
                              <IconButton
                                   Icon={MdContentCopy}
                                   onClick={() => {
                                        setCopied(true);
                                        navigator.clipboard.writeText(
                                             token as string
                                        );
                                   }}
                              />
                         </div>
                         <div className="my-5">
                              {copied && (
                                   <Alert
                                        value={`Copied to clipboard`}
                                        type="success"
                                        Icon={MdContentCopy}
                                   />
                              )}
                         </div>
                    </div>
               )}
          </div>
     );
};
