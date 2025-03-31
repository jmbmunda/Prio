"use client";

import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteChecklist, updateChecklist } from "@/actions/checklist";
import { useTransition } from "react";
import { motion } from "motion/react";
import { FaTrashCan } from "react-icons/fa6";

const ChecklistItem = ({ id, text, checked }: { id: string; text: string; checked: boolean }) => {
  const [isPending, startTransition] = useTransition();
  const isChecked = isPending ? !checked : checked;

  const handleChange = (id: string, checked: boolean) => {
    startTransition(async () => {
      try {
        await updateChecklist(id, { is_checked: checked });
      } catch {
        toast.error("Failed to change an item");
      }
    });
  };

  const handleRemove = async (id: string) => {
    const toastID = toast.loading("Deleting...");
    try {
      await deleteChecklist(id);
      toast.success("Deleted!", { id: toastID });
    } catch {
      toast.error("Failed to delete an item", { id: toastID });
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      key={id}
      className={cn(
        "flex justify-between items-center p-4 bg-background space-x-2 rounded-md",
        isChecked && "bg-opacity-80"
      )}
    >
      <div className={cn("flex w-full h-full items-center gap-4")}>
        <div className="flex w-full items-center gap-2">
          <Checkbox
            id={id}
            checked={isChecked}
            onCheckedChange={(checked: boolean) => {
              if (isPending) return;
              handleChange(id, checked);
            }}
            className="rounded-full"
          />

          <label
            htmlFor={id}
            className={cn(
              "text-sm w-full flex flex-wrap cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              isChecked && "line-through text-gray-500"
            )}
          >
            {text}
          </label>
        </div>

        {isChecked && (
          <FaTrashCan
            onClick={() => handleRemove(id)}
            className="cursor-pointer text-gray-500 hover:text-black"
          />
        )}
      </div>
    </motion.li>
  );
};

export default ChecklistItem;
