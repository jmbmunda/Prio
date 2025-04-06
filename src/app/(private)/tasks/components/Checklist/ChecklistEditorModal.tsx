"use client";

import { useTransition } from "react";
import { Button } from "@headlessui/react";
import { CgSpinner } from "react-icons/cg";
import { createChecklist } from "@/actions/checklist";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export type ChecklistEditorModalProps = {
  onClose: () => void;
};

export default function ChecklistEditorModal({ onClose }: ChecklistEditorModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = async (formData: FormData) => {
    startTransition(async () => {
      const toastID = toast.loading("Adding an item...");
      try {
        const data = {
          text: formData.get("text") as string,
        };
        await createChecklist(data);
        toast.success("Added an item!", { id: toastID });
      } catch {
        toast.error("Failed to add an item", { id: toastID });
      }
    });
    onClose();
  };

  const renderSubmitLabel = () => {
    return isPending ? "Adding..." : "Add";
  };

  return (
    <form action={handleAdd}>
      <div className="flex flex-col gap-2">
        <Textarea name="text" placeholder="Type your message here." />
      </div>
      <div className="mt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
        >
          {isPending && <CgSpinner className="animate-spin text-base" />}
          {renderSubmitLabel()}
        </Button>
      </div>
    </form>
  );
}
