import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { GetQuestsResponse } from "../Quest.types";

export const useGetQuestsKey = "useGetQuestsKey";
export function useGetQuestQuery(): QueryObserverResult<GetQuestsResponse, CommonErrorCodeType> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  return useQuery({
    queryKey: [useGetQuestsKey],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quests`,
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
    enabled: !!token,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
