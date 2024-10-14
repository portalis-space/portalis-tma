import { APILinksType, APIMetaType, JsonAPIType } from "../common/Common.types";
import { EventAttributesType } from "../event/Event.types";
import { UserAttributesType } from "../user/User.types";
import { ContractType } from "../web3/Web3.types";

export type TicketStatusType = 'AVAILABLE' | 'UNAVAILABLE';

export type TicketAttributesType = {
  chain: string;
  contractAddress: string;
  event: EventAttributesType & {id: string};
  expiredAt: string;
  issuedAt: string;
  owner: UserAttributesType & {id: string};
  status: TicketStatusType;
  ticketNumber: string;
  token: string;
  type: ContractType;
  walletAddress: string;
}

export type TicketType = {
  type: "ticket";
  id: string;
  attributes: TicketAttributesType;
}

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
    type: 'ticket';
    attributes: {
      ticketNumber: string;
      issuedAt: string;
      token: string;
      contractAddress: string;
      walletAddress: string;
      event: string;
      expiredAt: string;
      status: TicketStatusType;
      type: ContractType;
      chain: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    }
  };
}

export type GenerateQRParams = {
  ticket: string;
  walletAddress: string;
}

export type GenerateQRResponse = {
  jsonapi: JsonAPIType;
  data: {
    type: string;
    attributes: {
      expiredAt: number;
      qrString: string;
    }
  } 
}

export type ScanTicketParams = {
  qrString: string;
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
  data: TicketType[];
}

export type GetTicketParams = {
  id: string;
}

export type GetTicketResponse = {
  jsonapi: JsonAPIType;
  data: TicketType;
}