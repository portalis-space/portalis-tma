import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GetEventVisitorDataParams, GetEventVisitorDataResponse } from "../Event.types";
import { CommonErrorCodeType } from "@/services/common/Common.types";

export const useGetVisitorDataKey = "useGetVisitorDataKey";

export function useGetVisitorDataQuery(
    params: GetEventVisitorDataParams
): QueryObserverResult<GetEventVisitorDataResponse, CommonErrorCodeType> {
    const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;

    return useQuery({
        queryKey: [useGetVisitorDataKey, params],
        queryFn: async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/participants?page=${params.page}&size=${params.size}${
                    	params.event !== undefined
                    	? `&event=${params.event}`
                    	: encodeURIComponent("")
                    }${
											params.schedule !== undefined
                    	? `&schedule=${params.schedule}`
                    	: encodeURIComponent("")
                    }${
											params.ticket !== undefined
                    	? `&ticket=${params.ticket}`
                    	: encodeURIComponent("")
                    }${
											params.user !== undefined
                    	? `&user=${params.user}`
                    	: encodeURIComponent("")
                    }`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`
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
        enabled: !!params.page && !!params.size,
        refetchOnWindowFocus: false,
        retry: false,
    });
}
