"use client";

import { Faqs } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { updateFaqsInfo, deleteFaq } from "@/actions/settings";

const FaqSettingsForm = ({ initialData }: { initialData: Faqs[] }) => {
  const router = useRouter();
  const title = "Frequently asked questions";
  const description = "Manage your frequently asked questions here.";
  const action = "Save Changes";

  const [loading, setLoading] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const [faqs, setFaqs] = React.useState(
    initialData && initialData.length > 0
      ? initialData.map((faq) => ({
          id: faq.id,
          question: faq.question || "",
          answer: faq.answer || "",
        }))
      : [{ id: "new-0", question: "", answer: "" }]
  );

  const handleAddFaq = () => {
    const newId = `new-${Date.now()}`;
    setFaqs([...faqs, { id: newId, question: "", answer: "" }]);
  };

  const handleDeleteFaq = async (faqId: string, index: number) => {
    // If it's an existing FAQ (not new), delete from database
    if (!faqId.startsWith("new-")) {
      setDeletingId(faqId);
      try {
        const res = await deleteFaq(faqId);
        if (res.success) {
          toast.success(res.success);
          const updatedFaqs = [...faqs];
          updatedFaqs.splice(index, 1);
          setFaqs(updatedFaqs);
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the FAQ.");
      } finally {
        setDeletingId(null);
      }
    } else {
      // If it's a new FAQ (not saved yet), just remove from local state
      const updatedFaqs = [...faqs];
      updatedFaqs.splice(index, 1);
      setFaqs(updatedFaqs);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      // Filter out empty FAQs
      const validFaqs = faqs.filter(
        (faq) => faq.question.trim() && faq.answer.trim()
      );

      if (validFaqs.length === 0) {
        toast.error(
          "Please add at least one FAQ with both question and answer"
        );
        return;
      }

      const res = await updateFaqsInfo(validFaqs);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the FAQ information.");
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
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              <div className="grid lg:grid-cols-10 grid-cols-1 gap-4">
                <div className="space-y-2 lg:col-span-4">
                  <Label>
                    Question <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    placeholder="Enter question"
                    className="w-full"
                    value={faq.question}
                    onChange={(e) => {
                      const updatedFaqs = [...faqs];
                      updatedFaqs[index].question = e.target.value;
                      setFaqs(updatedFaqs);
                    }}
                  />
                </div>
                <div className="space-y-2 lg:col-span-4">
                  <Label>
                    Answer <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    disabled={loading}
                    placeholder="Enter answer"
                    className="w-full"
                    value={faq.answer}
                    onChange={(e) => {
                      const updatedFaqs = [...faqs];
                      updatedFaqs[index].answer = e.target.value;
                      setFaqs(updatedFaqs);
                    }}
                  />
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <Button
                    disabled={
                      loading ||
                      (faqs.length === 1 && !faq.id.startsWith("new-")) ||
                      deletingId === faq.id
                    }
                    variant="destructive"
                    className="mt-8 w-full"
                    type="button"
                    onClick={() => handleDeleteFaq(faq.id, index)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-2">
            <Button
              disabled={loading}
              variant="ghost"
              type="button"
              onClick={handleAddFaq}
            >
              + Add Another FAQ
            </Button>
            <SubmitButton isSubmitting={loading} label={action} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FaqSettingsForm;
