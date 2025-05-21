"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { createOAuthUser } from "@/actions/user";

export default function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const syncUser = async () => {
        const result = await createOAuthUser({
          clerkId: user.id,
          name:
            user.fullName ||
            `${user.firstName} ${user.lastName}` ||
            "Google User",
          email: user.primaryEmailAddress?.emailAddress || "",
          imageUrl: user.imageUrl,
        });

        if (result.error) {
          console.error(result.error);
        }
      };

      syncUser();
    }
  }, [user, isLoaded]);

  return null;
}
