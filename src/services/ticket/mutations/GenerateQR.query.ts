import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GenerateQRParams, GenerateQRResponse } from "../Ticket.types";

async function execute(
  params: GenerateQRParams
): Promise<GenerateQRResponse> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets/generate-qr`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
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

export default function useGenerateQR(
  options: UseMutationOptions<
    GenerateQRResponse,
    CommonErrorCodeType,
    GenerateQRParams
  >
): UseBaseMutationResult<
  GenerateQRResponse,
  CommonErrorCodeType,
  GenerateQRParams,
  unknown
> {
  return useMutation({
    mutationFn: (params: GenerateQRParams) => execute(params),
    ...options,
  });
}