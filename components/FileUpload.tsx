import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { convertFileToUrl } from "@/utils";
import IconsUpload from "./icons/IconsUpload";
import { cn } from "@/lib/utils";

type FileUploadProps = {
  setFile: (files: File) => void;
  fieldChange: (files: string) => void;
  mediaUrl?: string | undefined;
  className?: string;
};

const FileUpload = ({
  fieldChange,
  mediaUrl,
  setFile,
  className,
}: FileUploadProps) => {
  const [fileUrl, setFileUrl] = useState<string | undefined>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];

      const url = convertFileToUrl(file);
      setFile(file);
      setFileUrl(url);
      fieldChange(url);
    },
    [fieldChange, setFile]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "bg-inherit max-w-full  cursor-pointer max-h-[200px] h-full rounded-2xl py-4",
        className
      )}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <Image
          src={fileUrl}
          alt="image"
          className="max-w-full w-full max-h-[200px] h-full object-cover rounded-2xl"
          loading="lazy"
          width={1300}
          height={1300}
        />
      ) : (
        <div className="flex flex-col items-center gap-y-3 text-center  justify-center flex-shrink-0">
          <IconsUpload />
          <div className="flex flex-col gap-y-2">
            <span className="text-base font-medium text-white">
              Choose a file or drag & drop it here
            </span>
            <span className="text-sm font-normal text-gray9">
              JPEG, PNG, FIG formats, up to 50MB
            </span>
          </div>

          <Button
            variant="ghost"
            className="w-[231px] h-[40px] rounded-2xl bg-white text-black flex items-center justify-center py-2"
          >
            Browse File
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
