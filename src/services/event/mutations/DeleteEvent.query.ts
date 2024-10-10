import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { DeleteEventParams, DeleteEventResponse } from "../Event.types";

async function execute(
  params: DeleteEventParams
): Promise<DeleteEventResponse> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      throw JSON.parse(text);
    }
    return response.json();
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export default function useDeleteEvent(
  options: UseMutationOptions<
    DeleteEventResponse,
    CommonErrorCodeType,
    DeleteEventParams
  >
): UseBaseMutationResult<
  DeleteEventResponse,
  CommonErrorCodeType,
  DeleteEventParams,
  unknown
> {
  return useMutation({
    mutationFn: (params: DeleteEventParams) => execute(params),
    ...options,
  });
}