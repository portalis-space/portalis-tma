export type UploaderAttributesType = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  fileUrl: string;
}

export type UploaderType = {
  type: "uploader";
  attributes: UploaderAttributesType;
}

export type CreateUploaderParams = {
  file: File;
};

export type CreateUploaderResponse = {
  data: UploaderType;
};