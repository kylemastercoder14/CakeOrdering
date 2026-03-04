import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "@/lib/core";

const { uploadFiles } = genUploader<OurFileRouter>();

export async function upload(
  file: File,
  progressCallback?: (progress: number) => void
) {
  try {
    const [uploadedFile] = await uploadFiles("image", {
      files: [file],
      onUploadProgress: ({ progress }) => {
        if (progressCallback) progressCallback(progress);
      },
    });

    if (!uploadedFile) {
      throw new Error("UploadThing did not return an uploaded file.");
    }

    const url = uploadedFile.ufsUrl;
    return { url };
  } catch (error) {
    console.error("Error uploading with UploadThing:", error);
    throw error;
  }
}

export async function uploadFile(
  file: File,
  progressCallback?: (progress: number) => void
) {
  try {
    const [uploadedFile] = await uploadFiles("attachment", {
      files: [file],
      onUploadProgress: ({ progress }) => {
        if (progressCallback) progressCallback(progress);
      },
    });

    if (!uploadedFile) {
      throw new Error("UploadThing did not return an uploaded file.");
    }

    const url = uploadedFile.ufsUrl;
    return { url };
  } catch (error) {
    console.error("Error uploading with UploadThing:", error);
    throw error;
  }
}

/**
 * Delete a file from UploadThing.
 * This client helper is intentionally not implemented because deletes should
 * run on the server via UTApi for token safety.
 */

export async function deleteImage(
  fileKey: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!fileKey) {
      return { success: false, message: "No file key provided." };
    }

    return {
      success: false,
      message:
        "Delete is not implemented on the client with UploadThing. Use UTApi.deleteFiles from a server action or API route.",
    };
  } catch (error) {
    console.error("Error deleting file from UploadThing:", error);
    return { success: false, message: "Error deleting file from UploadThing." };
  }
}
