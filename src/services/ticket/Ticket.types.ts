import { APILinksType, APIMetaType, JsonAPIType } from "../common/Common.types";

export type GenerateTicketParams = {
  token: string;
  contractAddress: string;
  walletAddress: string;
  event: string;
  chain: string;
  type: string;
}

export type GenerateTicketResponse = {
  jsonapi: JsonAPIType;
  data: {
    type: string;
    id: string;
  }
}

export type GenerateQRParams = {
  ticket: string;
  walletAddress: string;
}

export type GenerateQRResponse = {
  jsonapi: JsonAPIType;
  data: unknown;
}

export type ScanTicketParams = {
  qrString: string;
}

export type ScanTicketResponse = {
  jsonapi: JsonAPIType;
  data: unknown;
}

export type GetTicketsParams = {
  page?: number;
  size: number;
  search?: string;
  event?: string;
  walletAddress?: string;
}

export type GetTicketsResponse = {
  jsonapi: JsonAPIType;
  meta: APIMetaType;
  links: APILinksType;
  data: unknown[];
}