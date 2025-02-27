// import { auth } from "@clerk/nextjs/server";
import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

// const handleAuth = async () => {
//   const { userId } = await auth();
//   if (!userId) {
//     return { error: "You must be logged in to create a course" };
//   }
//   return { userId };
// };

export const ourFileRouter = {
  image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  attachment: f(["text", "image", "video", "audio", "pdf"])
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  video: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    // .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
