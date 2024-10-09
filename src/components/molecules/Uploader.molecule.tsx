import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import useCreateUploader from "@/services/uploader/mutations/CreateUploader.mutation";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import { UploaderAttributesType } from "@/services/uploader/Uploader.types";

interface UploaderPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  handleChange: (resp: UploaderAttributesType) => void;
  fileKey?: string;
  square?: boolean;
}

const Uploader: FC<UploaderPropsType> = ({
  id,
  name,
  handleChange,
  fileKey,
  square,
  ...props
}) => {
  const [file, setfile] = useState<FileList | null>(null);
  const [errMessage, setErrMessage] = useState<string | undefined>(undefined);

  const createUploader = useCreateUploader({
    onSuccess: (resp) => {
      handleChange(resp.data.attributes);
    },
    onError: (err) => {
      setErrMessage(err.errors[0].detail)
    },
    onMutate: () => {
      setErrMessage(undefined);
    }
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles?.length) {
      setfile(selectedFiles);
      createUploader.mutate({ file: selectedFiles[0] });
    }
  };

  useEffect(() => {
    if (!fileKey) {
      setfile(null);
      setErrMessage(undefined);
    }
  }, [fileKey])

  return (
    <>
      <label
        htmlFor={id}
        className="w-full flex items-center justify-center gap-4 cursor-pointer lg:gap-7"
      >
        {file ? (
          <Image
            src={URL.createObjectURL(file[0])}
            alt="images"
            width={300}
            height={300}
            className={cn("h-[200px] w-auto rounded-lg", {"aspect-square": square})}
          />
        ) : (
          <>
            <div className="min-w-[141px] h-[141px] p-4 flex flex-col items-center justify-center border-[2px] border-dashed border-secondaryGrey-400 rounded-2xl lg:w-[240px] lg:h-[240px]">
              <Image
                src={"/assets/svg/upload-placeholder.svg"}
                height={200}
                width={200}
                alt="nusamarket text logo"
                className="h-[56px] w-auto"
              />
              <Typography variant="text-xs" className="text-center">Click here to upload.</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography weight="bold">Upload Image</Typography>
              <div>
                <Typography variant="text-xs">File types: JPG, PNG SVG, or GIF.</Typography>
                <Typography variant="text-xs">Max file size: <strong>1 MB</strong></Typography>
              </div>
            </div>
          </>
        )}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept={"image/*"}
        className="hidden"
        onChange={handleFileChange}
        {...props}
      />
      {errMessage && <small className="text-red-500">{errMessage}</small>}
    </>
  );
};

export default Uploader;
