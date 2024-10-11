import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { CommonErrorCodeType } from '@/services/common/Common.types';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { GetCollectionParams, GetCollectionResponse } from '../Web3.types';

export const useGetCollectionQueryKey = 'useGetCollectionQueryKey';

export function useGetCollectionQuery(params: GetCollectionParams): QueryObserverResult<GetCollectionResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [
      useGetCollectionQueryKey,
      params,
      token
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections/check?contractAddress=${params.contractAddress}&chain=${params.chain}&type=${params.type}`, {
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
    enabled: !!token && !!params.contractAddress && !!params.chain && !!params.type,
    retry: false,
    refetchOnWindowFocus: true,
  });
}
