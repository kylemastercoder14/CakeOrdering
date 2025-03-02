"use client";
import { toast } from "sonner";
import { ourFileRouter } from "@/lib/core";
import { UploadDropzone } from "@/lib/upload";
import React from "react";

const LogoUpload = ({
  onChange,
  endpoint,
  disabled,
}: {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  disabled?: boolean;
}) => {
  return (
    <UploadDropzone
      className="max-w-sm"
      disabled={disabled}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        toast.error(err?.message || "Upload failed");
      }}
    />
  );
};

export default LogoUpload;
