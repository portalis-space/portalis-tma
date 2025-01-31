import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { ScanTicketParams } from "../Ticket.types";

async function execute(
  params: ScanTicketParams
): Promise<unknown> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets/scan-ticket`,
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
    return response;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}

export default function useScanTicket(
  options: UseMutationOptions<
    unknown,
    CommonErrorCodeType,
    ScanTicketParams
  >
): UseBaseMutationResult<
  unknown,
  CommonErrorCodeType,
  ScanTicketParams,
  unknown
> {
  return useMutation({
    mutationFn: (params: ScanTicketParams) => execute(params),
    ...options,
  });
}