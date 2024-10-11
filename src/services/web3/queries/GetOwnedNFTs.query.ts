import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { CommonErrorCodeType } from '@/services/common/Common.types';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { GetOwnedNFTsParams, GetOwnedNFTsResponse } from '../Web3.types';

export const useGetOwnedNFTsQueryKey = 'useGetOwnedNFTsQueryKey';

export function useGetOwnedNFTsQuery(params: GetOwnedNFTsParams): QueryObserverResult<GetOwnedNFTsResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [
      useGetOwnedNFTsQueryKey,
      params,
      token
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/nfts/owned?page=${params.page}&size=${params.size}&walletAddress=${params.walletAddress}&chain=${params.chain}&type=${params.type}${
          params.contractAddress && params.contractAddress.length > 0 ?
            params.contractAddress.forEach((address) => `&contractAddress[]=${address}`) :
            encodeURIComponent("")
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
    enabled: !!token && !!params.page && !!params.size && !!params.walletAddress && !!params.chain,
    retry: false,
    refetchOnWindowFocus: true,
  });
}
