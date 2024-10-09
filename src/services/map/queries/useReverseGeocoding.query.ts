import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { ReverseGeocodingParams, ReverseGeocodingResponse } from "../Map.types";
import { CommonErrorCodeType } from "@/services/common/Common.types";

export function useGetReverseGeocoding(
  param: ReverseGeocodingParams
): QueryObserverResult<ReverseGeocodingResponse, CommonErrorCodeType> {
  return useQuery({
    queryKey: ["useGetReverseGeocodingQueryKey", param],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_REVERSE_GEOCODING_NOMINATIM}/reverse?lat=${param.lat}&lon=${param.lng}&format=json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(response.statusText);
          }
          throw new Error(response.statusText);
        }
        return response.json();
      } catch (error: unknown) {
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: param.lat !== 0 && param.lng !== 0,
  });
}
