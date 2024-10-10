import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { CommonErrorCodeType } from '@/services/common/Common.types';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { GetNFTsByContractParams, GetNFTsByContractResponse } from '../Web3.types';

export const useGetNFTsByContractQueryKey = 'useGetNFTsByContractQueryKey';

export function useGetNFTsByContractQuery(params: GetNFTsByContractParams): QueryObserverResult<GetNFTsByContractResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [
      useGetNFTsByContractQueryKey,
      params,
      token
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/nfts/by-contract?page=${params.page}&size=${params.size}&contractAddress=${params.contractAddress}&chain=${params.chain}&type=${params.type}${
          params.cursor ? `&cursor=${params.cursor}` : encodeURIComponent("")
        }`, {
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
    enabled: !!token && !!params.page && !!params.size && !!params.contractAddress && !!params.chain,
    retry: false,
    refetchOnWindowFocus: true,
  });
}
