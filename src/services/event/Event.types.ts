import { APILinksType, APIMetaType, JsonAPIType, SortType } from "../common/Common.types";

export type EventStatusType = 'ONGOING' | 'UPCOMING' | 'PAST';
export type EventScheduleTypeType = 'ONE_TIME' | 'DAILY' | 'WEEKLY';

export type EventLocationType = {
  type: string;
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
  schedules?: EventSchedulesType[];
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

