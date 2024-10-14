import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { GetEventsParams, GetEventsResponse } from "../Event.types";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export const useGetEventsKey = "useGetEventsKey";

export function useGetEventsQuery(
  params: GetEventsParams
): QueryObserverResult<GetEventsResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;

  return useQuery({
    queryKey: [useGetEventsKey, params],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events?page=${
            params.page
          }&size=${params.size}${
            params.search !== undefined
              ? `&search=${params.search}`
              : encodeURIComponent("")
          }${
            params["sort[title]"] !== undefined
              ? `&sort[title]=${params["sort[title]"]}`
              : encodeURIComponent("")
          }${
            params["sort[capacity]"] !== undefined
              ? `&sort[capacity]=${params["sort[capacity]"]}`
              : encodeURIComponent("")
          }${
            params["sort[schedule]"] !== undefined
              ? `&sort[schedule]=${params["sort[schedule]"]}`
              : encodeURIComponent("")
          }${
            params.longitude !== undefined
              ? `&longitude=${params.longitude}`
              : encodeURIComponent("")
          }${
            params.latitude !== undefined
              ? `&latitude=${params.latitude}`
              : encodeURIComponent("")
          }${
            params.distanceRad !== undefined
              ? `&distanceRad=${params.distanceRad}`
              : encodeURIComponent("")
          }${
            params.wallet !== undefined
              ? `&wallet=${params.wallet}`
              : encodeURIComponent("")
          }${
            params.chain !== undefined
              ? `&chain=${params.chain}`
              : encodeURIComponent("")
          }${
            params.type !== undefined
              ? `&type=${params.type}`
              : encodeURIComponent("")
          }${
            params.eligibleEvent !== undefined
              ? `&eligibleEvent=${params.eligibleEvent}`
              : encodeURIComponent("")
          }${
            params.isHighlighted !== undefined
              ? `&isHighlighted=${params.isHighlighted}`
              : encodeURIComponent("")
          }${
            params.status !== undefined
              ? `&status=${params.status}`
              : encodeURIComponent("")
          }${
            params.owner !== undefined
              ? `&owner=${params.owner}`
              : encodeURIComponent("")
          }${
            params.scannerEvent !== undefined
              ? `&scannerEvent=${params.scannerEvent}`
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
    enabled: !!params.page && !!params.size && !!token,
    refetchOnWindowFocus: true,
    retry: false
  });
}
