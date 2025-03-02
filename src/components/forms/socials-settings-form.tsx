"use client";

import { Contact, Socials } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";

import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { toast } from "sonner";
import { updateSocialsInfo } from "@/actions/settings";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react';

interface ContactProps extends Contact {
  socials: Socials[];
}

const SocialsSettingsForm = ({
  initialData,
}: {
  initialData: ContactProps | null;
}) => {
  const router = useRouter();
  const title = "Social information";
  const description = "Manage your social information including facebook, messenger, etc.";
  const action = "Save Changes";

  const [loading, setLoading] = React.useState(false);

  const [socials, setSocials] = React.useState(
    initialData?.socials && initialData.socials.length > 0
      ? initialData.socials.map((social) => ({
          id: social.id,
          platform: social.platform || "",
          url: social.url || "",
        }))
      : [{ platform: "", url: "" }]
  );

  const handleAddSocial = () => {
    setSocials([...socials, { platform: "", url: "" }]);
  };

  const handleDeleteSocial = (socialIndex: number) => {
    const updatedSocials = [...socials];
    updatedSocials.splice(socialIndex, 1);
    setSocials(updatedSocials);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await updateSocialsInfo(socials, initialData?.id || "");
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the social information.");
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
        <div className="lg:col-span-7 space-y-4">
          {socials.map((social, index) => (
            <div key={index}>
              <div className="grid lg:grid-cols-10 grid-cols-1 gap-4">
                <div className="space-y-2 lg:col-span-4">
                  <Label>
                    Platform Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    placeholder="Enter platform name (e.g. Facebook)"
                    className="w-full"
                    value={social.platform}
                    onChange={(e) => {
                      const updatedSocials = [...socials];
                      updatedSocials[index].platform = e.target.value;
                      setSocials(updatedSocials);
                    }}
                  />
                </div>
                <div className="space-y-2 lg:col-span-4">
                  <Label>
                    URL <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    placeholder="Enter url (e.g. https://www.facebook.com/[username])"
                    className="w-full"
                    value={social.url}
                    onChange={(e) => {
                      const updatedSocials = [...socials];
                      updatedSocials[index].url = e.target.value;
                      setSocials(updatedSocials);
                    }}
                  />
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <Button
                    disabled={loading || socials.length === 1}
                    variant="destructive"
					className='mt-8 w-full'
                    type="button"
                    onClick={() => handleDeleteSocial(index)}
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
                onClick={handleAddSocial}
              >
                + Add Another Social
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

export default SocialsSettingsForm;
