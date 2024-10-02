export type JsonAPIType = {
  version: string;
}

export type APIMetaType = {
  totalRecordCount: number;
  currentRecordCount: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
  startOf: number;
  timestamp: string;
}

export type APIMetaTimestampType = {
  timestamp: string;
}

export type APILinksType = {
  self: string;
  next: string;
  last: string;
}

export type CommonErrorCodeType = {
  errors: {
    status: number;
    code: string;
    detail: string;
  }[]
}