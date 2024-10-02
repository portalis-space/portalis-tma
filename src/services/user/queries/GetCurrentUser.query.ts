import {useQuery, QueryObserverResult} from '@tanstack/react-query';
import { GetCurrentUserParams, GetCurrentUserResponse } from './Types.user';
import { CommonErrorCodeType } from '@/services/common/Types.common';
import { useAuthContext } from '@/contexts/Auth.context';

export const useGetCurrentUserQueryKey = 'useGetCurrentUserQueryKey';

export function useGetCurrentUserQuery(params: GetCurrentUserParams): QueryObserverResult<GetCurrentUserResponse, CommonErrorCodeType> {
  const { handleToken } = useAuthContext();
  return useQuery({
    queryKey: [
      useGetCurrentUserQueryKey,
      params
    ],
    queryFn: async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${params.authToken}`
          },
        });
        if (!response.ok && handleToken) {
          if (params.authToken) {
            handleToken('', '')
          }
          throw new Error(response.statusText);
        }
        return await response.json();
      } catch (error: unknown) {
        throw error;
      }
    },
      enabled: !!params.authToken,
      retry: false,
      refetchOnWindowFocus: true,
  });
}
