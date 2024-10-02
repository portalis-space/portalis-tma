"use client"
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { UserType } from '@/services/user/queries/Types.user';
import { useGetCurrentUserQuery } from '@/services/user/queries/GetCurrentUser.query';
import Loader from '@/components/molecules/Loader.molecule';

interface IProps {
  children?: ReactNode
}
interface IAuthContext {
  currentUserData: UserType | undefined;
  isInitializing: boolean;
  authToken?: string;
  refreshToken?: string;
  handleToken?: (at: string, rt: string) => void;
}

const defaultState = {
  currentUserData: undefined,
  isInitializing: false,
  authToken: undefined,
  refreshToken: undefined,
  handleToken: undefined,
};

export const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider = ({ children }: IProps) => {
  const path = usePathname();
  const isAuthPage = ['/signin'].includes(path);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);

  const {isLoading, ...currentUserQuery} = useGetCurrentUserQuery({authToken: authToken || ''});
  const currentUserData = useMemo(() => currentUserQuery.data?.data, [currentUserQuery.data]);

  const handleToken = useCallback((at: string, rt: string) => {
    setAuthToken(at);
    setRefreshToken(rt);
  }, [])

  if (isLoading || (!isAuthPage && !currentUserData)) {
    return (
      <main className="flex flex-col h-screen w-screen justify-center items-center bg-neutral-50 dark:bg-neutral-950">
        <Loader />
      </main>
    )
  }
  return (
    <AuthContext.Provider value={{ currentUserData, isInitializing: isLoading, authToken, refreshToken, handleToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};