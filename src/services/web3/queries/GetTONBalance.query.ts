import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { GetTONBalanceError, GetTONBalanceParams, GetTONBalanceResponse,  } from '../Web3.types';

export const useGetTONBalanceQueryKey = 'useGetTONBalanceQueryKey';

export function useGetTONBalanceQuery(params: GetTONBalanceParams): QueryObserverResult<GetTONBalanceResponse, GetTONBalanceError> {
  return useQuery({
    queryKey: [
      useGetTONBalanceQueryKey,
      params,
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${params.walletAddress}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
    enabled: !!params.walletAddress,  // Only run the query if the auth token exists
    retry: false,
    refetchOnWindowFocus: true,
  });
}
