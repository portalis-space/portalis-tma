import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GetTicketParams, GetTicketResponse } from "../Ticket.types";
import { CommonErrorCodeType } from "@/services/common/Common.types";

export const useGetTicketKey = "useGetTicketKey";
export function useGetTicketQuery(
  params: GetTicketParams
): QueryObserverResult<GetTicketResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [useGetTicketKey, params.id],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
    enabled: !!params.id && !!token,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
