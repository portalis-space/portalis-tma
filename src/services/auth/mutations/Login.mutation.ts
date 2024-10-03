import {
  UseBaseMutationResult,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { LoginParams, LoginResponses } from '../Auth.types';
import { CommonErrorCodeType } from '@/services/common/Common.types';

async function execute(
  params: LoginParams,
): Promise<LoginResponses> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
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

export default function useLogin(
  options: UseMutationOptions<
    LoginResponses,
    CommonErrorCodeType,
    LoginParams
  >,
): UseBaseMutationResult<
  LoginResponses,
  CommonErrorCodeType,
  LoginParams,
  unknown
> {
  return useMutation({mutationFn:
    (params:LoginParams) => execute(params),
    ...options
});
}
