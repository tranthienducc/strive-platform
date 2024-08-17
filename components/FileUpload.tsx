import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { convertFileToUrl } from "@/utils";

type FileUploadProps = {
  setFile: (files: File) => void;
  fieldChange: (files: string) => void;
  mediaUrl: string | undefined;
};

const FileUpload = ({ fieldChange, mediaUrl, setFile }: FileUploadProps) => {
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
  console.log("fileUrl", fileUrl);

  return (
    <div
      {...getRootProps()}
      className="bg-inherit max-w-full   cursor-pointer border-dotted border-white border rounded-2xl"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <Image
            src={fileUrl}
            alt="image"
            className="max-w-full w-full max-h-[200px] h-full object-cover rounded-2xl flex-1"
            loading="lazy"
            width={1300}
            height={1300}
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-y-3 text-center py-4 justify-center">
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            loading="lazy"
            width={500}
            height={500}
            className="size-[46px]"
          />

          <div className="flex flex-col gap-y-2">
            <p className="text-base font-medium text-white">
              Choose a file or drag & drop it here
            </p>
            <span className="text-sm font-normal text-gray9">
              JPEG, PNG, PDG, and MP4 formats, up to 50MB
            </span>
          </div>

          <Button
            variant="ghost"
            className="w-[231px] h-[40px] rounded-2xl bg-white flex items-center justify-center py-2"
          >
            Browse File
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
