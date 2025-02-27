import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
  isSubmitting,
  label,
}: {
  isSubmitting: boolean;
  label: string;
}) => {
  return (
    <Button disabled={isSubmitting} type="submit">
      {isSubmitting && <Loader2 className="size-4 animate-spin" />}
      {label}
    </Button>
  );
};

export default SubmitButton;
