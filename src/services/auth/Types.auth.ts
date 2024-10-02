import { APIMetaTimestampType, JsonAPIType } from "../common/Types.common";

export type LoginParams = {
  token: string;
}

export type LoginResponses = {
  jsonapi: JsonAPIType;
  meta: APIMetaTimestampType;
  data: {
    type: "auth";
    attributes: {
      accessToken: {
        token: string;
        expireIn: string;
      };
      refreshToken: {
        token: string;
        expireIn: string;
      };
      tokenType: "Bearer";
    }
  }
}
