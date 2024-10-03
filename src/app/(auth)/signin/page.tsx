"use client"
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import { useAuthContext } from "@/contexts/Auth.context";
import useLogin from "@/services/auth/mutations/Login.mutation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sessionName, sessionRefreshName } from "@/commons/common.constant";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUserQueryKey } from "@/services/user/queries/GetCurrentUser.query";
import Cookies from "js-cookie";

const SignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const {currentUserData, isInitializing} = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState<string | undefined>(undefined)

  const signin = useLogin({
    onSuccess: (res) => {
      Cookies.set(sessionName, res.data.attributes.accessToken.token, { 
        sameSite: 'None', 
        secure: true 
      });
      Cookies.set(sessionRefreshName, res.data.attributes.refreshToken.token, { 
        sameSite: 'None', 
        secure: true 
      });
      queryClient.invalidateQueries({queryKey: [useGetCurrentUserQueryKey]});
      router.replace('/');
    },
    onError: (err) => {
      setErrMessage(`${err.errors[0].code}. You don't have a permission to access this site`);
    },
    onMutate: () => {
      setErrMessage(undefined);
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (!isInitializing && currentUserData?.id) {
      router.replace('/')
    }
    if (!isInitializing && !currentUserData?.id && token) {
      signin.mutate({token})
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isInitializing) {
    return (
      <main className="flex flex-col h-screen w-screen justify-center items-center bg-neutral-50 dark:bg-neutral-950">
        <Loader />
      </main>
    )
  }

  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <Typography variant="text-lg" weight="bold">Welcome, {currentUserData?.attributes?.username}</Typography>
        <div className="flex flex-row items-center justify-center pt-10">
          <Typography variant="text-sm" weight="bold" className="text-center w-2/3 truncate">{token}</Typography>
          <ClipboardButton textToCopy={token || '-'} />
        </div>
        {
          errMessage && <Typography variant="text-xs" weight="bold" className="text-red-500">{errMessage}</Typography>
        }
      </div>
    </main>
  )
}

export default SignIn;