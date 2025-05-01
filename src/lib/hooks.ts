import { UploadClient, Url, Uuid } from "@uploadcare/upload-client";
import { useState } from "react";

type FileType = Blob | File | Buffer | Url | Uuid;

const client = new UploadClient({ publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY! });

export const useFileUploader = () => {
  const abortController = new AbortController();
  const [status, setStatus] = useState({
    isUploading: false,
    isCancelled: false,
  });
  const [progress, setProgress] = useState<number | null>(null);

  const getInfoAsync = async (fileUuid: Uuid) => {
    try {
      const info = await client.info(fileUuid);
      return info;
    } catch {
      return null;
    }
  };

  const upload = async (file: FileType) => {
    try {
      setProgress(0);
      const res = await client.uploadFile(file, {
        signal: abortController.signal,
        onProgress: (prog) => {
          if (prog.isComputable) {
            setProgress(prog.value * 100);
          }
        },
      });
      setProgress(null);
      return res;
    } catch (error: unknown) {
      const err = error as Error & { isCancel?: boolean };
      if (err.isCancel) {
        setStatus({ isUploading: false, isCancelled: true });
      }
      setProgress(null);
      return null;
    }
  };

  const cancelUpload = () => abortController.abort();

  return { status, progress, getInfoAsync, upload, cancelUpload };
};
