"use client";

import {
  FileUploaderRegular,
  FileUploaderInline,
  FileUploaderMinimal,
  OutputCollectionState,
  OutputCollectionStatus,
} from "@uploadcare/react-uploader";
import React, { useState } from "react";

import "@uploadcare/react-uploader/core.css";
import { useTheme } from "@/context/theme";

type Props = {
  type?: "regular" | "inline" | "minimal";
  className?: string;
  onDoneClick?: (event: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">) => void;
} & Partial<Omit<React.ComponentProps<typeof FileUploaderRegular>, "pubkey">>;

const UploadFile = ({ type = "regular", className, onDoneClick, ...props }: Props) => {
  const { theme } = useTheme();
  const [uploadKey, setUploadKey] = useState(0);

  const UploaderComponent = (() => {
    switch (type) {
      case "regular":
        return FileUploaderRegular;
      case "inline":
        return FileUploaderInline;
      case "minimal":
        return FileUploaderMinimal;
      default:
        return FileUploaderRegular;
    }
  })();

  return (
    <UploaderComponent
      key={uploadKey}
      pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY!}
      className={className}
      classNameUploader={theme == "light" ? "uc-light" : "uc-dark"}
      onDoneClick={(e) => {
        onDoneClick?.(e);
        setUploadKey((prev) => prev + 1);
      }}
      {...props}
    />
  );
};

export default UploadFile;
