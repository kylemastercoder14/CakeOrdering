"use client";

import { Faqs } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";

import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/global/submit-button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react';
import { updateFaqsInfo } from '@/actions/settings';

const FaqSettingsForm = ({
  initialData,
}: {
  initialData: Faqs[];
}) => {
  const router = useRouter();
  const title = "Frequently asked questions";
  const description = "Manage your frequently asked questions here.";
  const action = "Save Changes";

  const [loading, setLoading] = React.useState(false);

  const [faqs, setFaqs] = React.useState(
	initialData && initialData.length > 0
	  ? initialData.map((faq) => ({
		  id: faq.id,
		  question: faq.question || "",
		  answer: faq.answer || "",
		}))
	  : [{ question: "", answer: "" }]
  );

  const handleAddFaq = () => {
	setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleDeleteFaq = (faqIndex: number) => {
	const updatedFaqs = [...faqs];
	updatedFaqs.splice(faqIndex, 1);
	setFaqs(updatedFaqs);
  };

  const onSubmit = async () => {
	setLoading(true);
	try {
	  const res = await updateFaqsInfo(faqs);
	  if (res.success) {
		toast.success(res.success);
		router.refresh();
	  } else {
		toast.error(res.error);
	  }
	} catch (error) {
	  console.error(error);
	  toast.error("An error occurred while updating the faq information.");
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
			<div key={index}>
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
					  const updatedFaq = [...faqs];
					  updatedFaq[index].question = e.target.value;
					  setFaqs(updatedFaq);
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
					  const updatedFaq = [...faqs];
					  updatedFaq[index].answer = e.target.value;
					  setFaqs(updatedFaq);
					}}
				  />
				</div>
				<div className="lg:col-span-2 space-y-2">
				  <Button
					disabled={loading || faqs.length === 1}
					variant="destructive"
					className='mt-8 w-full'
					type="button"
					onClick={() => handleDeleteFaq(index)}
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
				onClick={handleAddFaq}
			  >
				+ Add Another FAQ
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

export default FaqSettingsForm;
