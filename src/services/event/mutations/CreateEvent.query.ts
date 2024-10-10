import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { CreateEventParams, CreateEventResponse } from "../Event.types";

async function execute(
  params: CreateEventParams
): Promise<CreateEventResponse> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
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

export default function useCreateEvent(
  options: UseMutationOptions<
    CreateEventResponse,
    CommonErrorCodeType,
    CreateEventParams
  >
): UseBaseMutationResult<
  CreateEventResponse,
  CommonErrorCodeType,
  CreateEventParams,
  unknown
> {
  return useMutation({
    mutationFn: (params: CreateEventParams) => execute(params),
    ...options,
  });
}