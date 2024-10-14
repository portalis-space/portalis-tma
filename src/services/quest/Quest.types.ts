import { JsonAPIType } from "../common/Common.types"

export type QuestTaskType = "ONE_TIME" | string;
export type QuestTaskKindType = "CONNECT_WALLET" | string;
export type QuestStatusType = "ACTIVE" | string;
export type QuestProgressType = {
  _id: string;
  quest: string;
  user: string;
  score: number;
  doneAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type QuestAttributesType = {
  _id: string;
  task: string;
  taskType: QuestTaskType;
  taskKind: QuestTaskKindType;
  requirement: QuestTaskKindType;
  description: string;
  status: QuestStatusType;
  reward: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reqAmount: number;
  progress: QuestProgressType[];
}

export type QuestType = {
  type: "quest";
  id: string;
  attributes: QuestAttributesType;
}

export type GetQuestsParams = {
  id?: string;
}

export type GetQuestsResponse = {
  jsonapi: JsonAPIType;
  data: QuestType[];
}