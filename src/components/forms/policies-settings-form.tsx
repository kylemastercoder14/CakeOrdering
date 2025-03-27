"use client";

import { Policies } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";

import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Editor from "@/components/ui/editor";
import { updatePoliciesInfo } from '@/actions/settings';

const PoliciesSettingsForm = ({ initialData }: { initialData: Policies[] }) => {
  const router = useRouter();
  const title = "Policies";
  const description =
    "Manage your policies here such as refund, privacy, and terms of service.";
  const action = "Save Changes";

  const [loading, setLoading] = React.useState(false);

  const [policies, setPolicies] = React.useState(
    initialData && initialData.length > 0
      ? initialData.map((policy) => ({
          id: policy.id,
          title: policy.title || "",
          content: policy.content || "",
        }))
      : [{ title: "", content: "" }]
  );

  const handleAddPolicy = () => {
    setPolicies([...policies, { title: "", content: "" }]);
  };

  const handleDeletePolicy = (policyIndex: number) => {
    const updatedPolicies = [...policies];
    updatedPolicies.splice(policyIndex, 1);
    setPolicies(updatedPolicies);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
        const res = await updatePoliciesInfo(policies);
        if (res.success) {
      	toast.success(res.success);
      	router.refresh();
        } else {
      	toast.error(res.error);
        }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the policies information.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-1 flex-col py-4 pt-0">
      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="grid lg:grid-cols-10 grid-cols-1 mt-5"
      >
        <div className="md:col-span-3">
          <h1 className="font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="lg:col-span-7 space-y-2">
          {policies.map((policy, index) => (
            <div key={index}>
              <div className="flex flex-col gap-4">
                <div className="space-y-2 lg:col-span-4">
                  <Label>
                    Title <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    placeholder="Enter title (e.g. Refund Policy)"
                    className="w-full"
                    value={policy.title}
                    onChange={(e) => {
                      const updatedPolicy = [...policies];
                      updatedPolicy[index].title = e.target.value;
                      setPolicies(updatedPolicy);
                    }}
                  />
                </div>
                <div className="space-y-2 lg:col-span-4">
                  <Label>
                    Content <span className="text-red-600">*</span>
                  </Label>
                  <Editor
                    disabled={loading}
                    value={policy.content}
                    onChange={(newContent) => {
                      const updatedPolicy = [...policies];
                      updatedPolicy[index].content = newContent;
                      setPolicies(updatedPolicy);
                    }}
                  />
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <Button
                    disabled={loading || policies.length === 1}
                    variant="destructive"
                    className="mt-3 w-full"
                    type="button"
                    onClick={() => handleDeletePolicy(index)}
                  >
                    <Trash />
                    Delete Column
                  </Button>
                </div>
              </div>
              <Button
                className="mt-3"
                disabled={loading}
                variant="ghost"
                type="button"
                onClick={handleAddPolicy}
              >
                + Add Another Policy
              </Button>
            </div>
          ))}
          <div className="flex justify-end items-center mt-3 gap-2">
            <SubmitButton isSubmitting={loading} label={action} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PoliciesSettingsForm;
