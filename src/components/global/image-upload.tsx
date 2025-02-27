"use client";
import { toast } from "sonner";
import { ourFileRouter } from "@/lib/core";
import { UploadDropzone } from "@/lib/upload";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ImageUpload = ({
  onChange,
  endpoint,
  disabled,
  initialImage,
}: {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  disabled?: boolean;
  initialImage?: string; // Accept initial image URL
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleUploadComplete = (res: { url: string }[]) => {
    const imageUrl = res?.[0]?.url;
    if (imageUrl) {
      setPreview(imageUrl);
      onChange(imageUrl);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {preview && !isEditing ? (
        <div className="relative w-40 h-40 rounded-md overflow-hidden border">
          <Image
            src={preview}
            alt="Uploaded Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <UploadDropzone
          className="w-full"
          disabled={disabled}
          endpoint={endpoint}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(err) => {
            toast.error(err?.message || "Upload failed");
          }}
        />
      )}
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsEditing(!isEditing)}
        disabled={disabled}
      >
        {isEditing ? "Cancel" : preview ? "Edit Image" : "Upload Image"}
      </Button>
    </div>
  );
};

export default ImageUpload;
