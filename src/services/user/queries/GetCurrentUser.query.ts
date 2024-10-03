import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { sessionName, sessionRefreshName } from '@/commons/common.constant';
import { GetCurrentUserResponse } from './Types.user';
import { CommonErrorCodeType } from '@/services/common/Common.types';

export const useGetCurrentUserQueryKey = 'useGetCurrentUserQueryKey';

export function useGetCurrentUserQuery(): QueryObserverResult<GetCurrentUserResponse, CommonErrorCodeType> {
  const token = Cookies.get(sessionName);
  const refreshToken = Cookies.get(sessionRefreshName);

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
          if (refreshToken) {
            // Try refreshing the token
            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
              },
            });

            if (!refreshResponse.ok) {
              // If refreshing the token fails, remove both tokens
              Cookies.remove(sessionName);
              Cookies.remove(sessionRefreshName);
              throw new Error(refreshResponse.statusText);
            } else {
              // If the refresh is successful, extract the new auth token
              const refreshData = await refreshResponse.json();
              const newAuthToken = refreshData.data.attributes.accessToken.token;
              const newRefreshToken = refreshData.data.attributes.refreshToken.token;
              // Save the new auth token in the cookie
              Cookies.set(sessionName, newAuthToken, { secure: true, sameSite: 'None' });
              Cookies.set(sessionRefreshName, newRefreshToken, { secure: true, sameSite: 'None' });

              // Retry fetching the current user with the new token
              const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${newAuthToken}`,
                },
              });
              // If retry fails, throw an error
              if (!retryResponse.ok) {
                throw new Error(retryResponse.statusText);
              }
              // Return the user data
              return await retryResponse.json();
            }
          } else {
            // If there's no refresh token, remove the auth token and throw an error
            Cookies.remove(sessionName);
            throw new Error(response.statusText);
          }
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
