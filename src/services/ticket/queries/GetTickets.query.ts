import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GetTicketsParams, GetTicketsResponse } from "../Ticket.types";

export const useGetTicketsKey = "useGetTicketsKey";

export function useGetTicketsQuery(
  params: GetTicketsParams
): QueryObserverResult<GetTicketsResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;

  return useQuery({
    queryKey: [useGetTicketsKey, params],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets?page=${
            params.page
          }&size=${params.size}${
            params.search !== undefined
              ? `&search=${params.search}`
              : encodeURIComponent("")
          }${
            params.event !== undefined
              ? `&event=${params.event}`
              : encodeURIComponent("")
          }${
            params.walletAddress !== undefined
              ? `&walletAddress=${params.walletAddress}`
              : encodeURIComponent("")
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      } catch (error: unknown) {
        throw error;
      }
    },
    enabled: !!params.page && !!params.size && !!params.walletAddress && !!token,
    refetchOnWindowFocus: false,
    retry: false
  });
}
