import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GenerateTicketParams, GenerateTicketResponse } from "../Ticket.types";

async function execute(
  params: GenerateTicketParams
): Promise<GenerateTicketResponse> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets`,
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

export default function useGenerateTicket(
  options: UseMutationOptions<
    GenerateTicketResponse,
    CommonErrorCodeType,
    GenerateTicketParams
  >
): UseBaseMutationResult<
  GenerateTicketResponse,
  CommonErrorCodeType,
  GenerateTicketParams,
  unknown
> {
  return useMutation({
    mutationFn: (params: GenerateTicketParams) => execute(params),
    ...options,
  });
}