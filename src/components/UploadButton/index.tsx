"use client";

import { UploadcareFile } from "@uploadcare/upload-client";
import React, { useRef } from "react";

import { useFileUploader } from "@/lib/hooks/useFileUploader";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"button"> & {
  children: React.ReactNode;
  maxFileSize?: number;
  accept?: string;
  onUploadChange?: (data: UploadcareFile) => void;
};

const UploadButton = ({
  children,
  maxFileSize = 10 * 1024 * 1024, // 10mb
  accept = "*",
  onUploadChange,
  className,
  ...props
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { progress, upload } = useFileUploader();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (maxFileSize && file.size > maxFileSize) return;
    const res = await upload(file);
    if (res) onUploadChange?.(res);
  };

  return (
    <>
      <button
        onClick={() => inputFileRef.current?.click()}
        type="button"
        disabled={progress !== null}
        className={cn("bg-primary-foreground p-2 rounded-md", "disabled:opacity-40", className)}
        {...props}
      >
        {progress ? `${progress.toFixed()}%` : children}
      </button>
      <input
        ref={inputFileRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};

export default UploadButton;
