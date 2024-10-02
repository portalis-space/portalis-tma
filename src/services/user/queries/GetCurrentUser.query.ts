import {useQuery, QueryObserverResult} from '@tanstack/react-query';
import { sessionName } from '@/commons/common.constant';
import { GetCurrentUserResponse } from './Types.user';
import { CommonErrorCodeType } from '@/services/common/Types.common';

export const useGetCurrentUserQueryKey = 'useGetCurrentUserQueryKey';

export function useGetCurrentUserQuery(): QueryObserverResult<GetCurrentUserResponse, CommonErrorCodeType> {
  const token = typeof window !== 'undefined' && sessionStorage.getItem(sessionName);
  return useQuery({
    queryKey: [
      useGetCurrentUserQueryKey,
      token
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          if (token) {
            sessionStorage.clear();
          }
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (error: unknown) {
        throw error;
      }
    },
      enabled: !!token,
      retry: false,
      refetchOnWindowFocus: true,
  });
}
