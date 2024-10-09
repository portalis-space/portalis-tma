"use client"
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { UserType } from '@/services/user/User.types';
import { useGetCurrentUserQuery } from '@/services/user/queries/GetCurrentUser.query';
import '../utils/TelegramMocks';
import Splash from '@/components/organisms/Splash.organism';

interface IProps {
  children?: ReactNode
}
interface IAuthContext {
  currentUserData: UserType | undefined;
  isInitializing: boolean;
}

const defaultState = {
  currentUserData: undefined,
  isInitializing: false,
};

export const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider = ({ children }: IProps) => {
  const path = usePathname();
  const isAuthPage = ['/signin'].includes(path);
  const {isLoading, ...currentUserQuery} = useGetCurrentUserQuery();
  const currentUserData = useMemo(() => currentUserQuery.data?.data, [currentUserQuery.data]);

  if (isLoading || (!isAuthPage && !currentUserData)) {
    return (
      <Splash />
    )
  }
  return (
    <AuthContext.Provider value={{ currentUserData, isInitializing: isLoading }}>
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