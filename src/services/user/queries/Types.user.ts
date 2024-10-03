import { JsonAPIType } from "@/services/common/Common.types";

export type UserAttributesType = {
  chatId: string;
  username: string;
  userId: string;
  profilePics: [];
  firstName: string;
  lastName: string;
}

export type UserType = {
  type: string;
  id: string;
  attributes: UserAttributesType
}

export type GetCurrentUserParams = {
  authToken: string;
}

export type GetCurrentUserResponse = {
  jsonapi: JsonAPIType;
  data: UserType;
}