import { APILinksType, APIMetaType, DayType, JsonAPIType, SortType } from "../common/Common.types";
import { EligibleContractType } from "../web3/Web3.types";

export type EventStatusType = 'ONGOING' | 'UPCOMING' | 'PAST';
export type EventScheduleTypeType = 'ONE_TIME' | 'DAILY' | 'WEEKLY';

export type EventLocationType = {
  type?: string;
  latitude: number;
  longitude: number;
  address: string;
}

export type EventOwnerType = {
  id: string;
  chatId: string;
  username: string;
  userId: string;
  profilePics: string | null;
}

export type EventSchedulesType = {
  startAt: string;
  endAt: string;
  timezone: string;
  status: "INACTIVE" | "ACTIVE";
}

export type EventContractAdressesType = {
  id: string;
  deploy_block_number?: number;
  description?: string;
  discord?: string;
  email?: string;
  erc_type?: string;
  featured_url?: string;
  floor_price?: number;
  github?: string;
  instagram?: string;
  is_spam?: false,
  items_total?: number;
  kind?: string;
  large_image_url?: string;
  logo_url?: string;
  medium?: string;
  name?: string;
  opensea_slug?: string;
  opensea_verified?: string;
  owner?: string;
  owners_total?: 113183,
  price_symbol?: string;
  royalty?: string;
  symbol?: string;
  telegram?: string;
  twitter?: string;
  verified?: false,
  website?: string;
  contract_address?: string;
  collections_with_same_name?: unknown[];
  banner_url?: string;
  amounts_total?: number;
  attributes?: unknown[];
}

export type EventAttributesType = {
  title: string;
  description: string;
  capacity: boolean;
  banner: string;
  location: EventLocationType;
  owner: EventOwnerType;
  isHighlighted: boolean;
  startAt: string;
  endAt: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
  schedulesCount?: number;
  schedules?: EventSchedulesType[];
  scanners?: string[];
  contractAddresses?: EventContractAdressesType[];
}

export type EventType = {
  type: "event";
  id: string;
  attributes: EventAttributesType;
}

export type GetEventsParams = {
  page?: number;
  size: number;
  search?: string;
  "sort[title]"?: SortType;
  "sort[capacity]"?: SortType;
  "sort[schedule]"?: SortType;
  latitude?: number;
  longitude?: number;
  distanceRad?: number;
  wallet?: string;
  chain?: string;
  type?: 'ton' | 'evm';
  eligibleEvent?: boolean;
  isHighlighted?: boolean;
  status?: EventStatusType;
  owner?: string;
  scannerEvent?: boolean;
}

export type GetEventsResponse = {
  jsonapi: JsonAPIType;
  meta: APIMetaType;
  links: APILinksType;
  data: EventType[];
}

export type GetEventParams = {
  id: string;
}

export type GetEventResponse = {
  jsonapi: JsonAPIType;
  data: EventType;
}

export type CreateEventParams = {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  scheduleType?: EventScheduleTypeType;
  timezone?: string;
  scheduleInterval?: DayType[];
  title?: string;
  description?: string;
  location?: EventLocationType;
  banner?: string;
  capacity?: number;
  isHighlighted?: boolean;
  contractAddresses?: EligibleContractType[];
  scanners?: string[];
}

export type CreateEventResponse = {
  jsonapi: JsonAPIType;
  data: {
    type: "event";
    id: string;
  }
}

export type DeleteEventParams = {
  id: string;
}

export type DeleteEventResponse = {
  jsonapi: JsonAPIType;
  data: {
    type: "event";
    id: string;
  }
}

// ############################################ PARTICIPANT / VISITOR

export type EventVisitorType = {
  type: "participant";
  id: string;
  attributes: unknown;
}

export type GetEventVisitorDataParams = {
  page: number;
  size: number;
  event?: string;
  schedule?: string;
  ticket?: string;
  user?: string;
}

export type GetEventVisitorDataResponse = {
  jsonapi: JsonAPIType;
  meta: APIMetaType;
  links: APILinksType;
  data: EventVisitorType[];
}

