import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { GetCurrentUserResponse } from './Types.user';
import { CommonErrorCodeType } from '@/services/common/Common.types';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
export const useGetCurrentUserQueryKey = 'useGetCurrentUserQueryKey';

export function useGetCurrentUserQuery(): QueryObserverResult<GetCurrentUserResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [
      useGetCurrentUserQueryKey,
      token,
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // If the initial request is successful, return the user data
        return await response.json();
      } catch (error: unknown) {
        throw error;
      }
    },
    enabled: !!token,  // Only run the query if the auth token exists
    retry: false,
    refetchOnWindowFocus: true,
  });
}
