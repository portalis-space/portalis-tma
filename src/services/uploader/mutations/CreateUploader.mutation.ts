import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { CreateUploaderParams, CreateUploaderResponse } from "../Uploader.types";
import { CommonErrorCodeType } from "@/services/common/Common.types";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

async function execute(
  params: CreateUploaderParams
): Promise<CreateUploaderResponse> {
  const token = typeof window !== "undefined" && retrieveLaunchParams().initDataRaw;
  try {
    const formData = new FormData();
    formData.append("file", params.file);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/uploaders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

export default function useCreateUploader(
  options: UseMutationOptions<
    CreateUploaderResponse,
    CommonErrorCodeType,
    CreateUploaderParams
  >
): UseBaseMutationResult<
  CreateUploaderResponse,
  CommonErrorCodeType,
  CreateUploaderParams,
  unknown
> {
  return useMutation({
    mutationFn: (params: CreateUploaderParams) => execute(params),
    ...options,
  });
}