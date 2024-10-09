import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { CommonErrorCodeType } from '@/services/common/Common.types';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { GetChainsParams, GetChainsResponse } from '../Web3.types';

export const useGetChainsQueryKey = 'useGetChainsQueryKey';

export function useGetChainsQuery(params: GetChainsParams): QueryObserverResult<GetChainsResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [
      useGetChainsQueryKey,
      params,
      token
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chains/${params.contractType}`, {
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
    enabled: !!token && !!params.contractType,  // Only run the query if the auth token exists
    retry: false,
    refetchOnWindowFocus: true,
  });
}
