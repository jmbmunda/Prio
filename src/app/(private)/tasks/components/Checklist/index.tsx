"use client";

import { Checklist as TCheckList } from "@prisma/client";
import { AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { deleteChecklist, updateChecklist } from "@/actions/checklist";

import AddItem from "./AddItem";
import ChecklistItem from "./ChecklistItem";

type Props = {
  data: TCheckList[];
};

const Checklist = ({ data }: Props) => {
  const [checkLists, setChecklists] = useState(data);

  useEffect(() => {
    setChecklists(data);
  }, [data]);

  const handleChange = async (id: string, checked: boolean) => {
    try {
      await updateChecklist(id, { is_checked: checked });
    } catch {
      toast.error("Failed to update an item");
    }
  };

  const handleRemove = async (id: string) => {
    setChecklists((prev) => prev.filter((item) => item.id !== id));
    const toastID = toast.loading("Deleting...");
    try {
      await deleteChecklist(id);
      toast.success("Deleted!", { id: toastID });
    } catch {
      toast.error("Failed to delete an item", { id: toastID });
    }
  };

  return (
    <div className="gap-4 h-[50vh] flex flex-col justify-between">
      <ul className="flex flex-col gap-2 overflow-y-auto">
        <AnimatePresence key="checklist">
          {checkLists?.map((checklist) => (
            <li key={checklist.id} className="space-y-4 flex flex-col">
              <ChecklistItem
                id={checklist.id}
                text={checklist.text}
                checked={checklist.is_checked}
                handleChange={handleChange}
                handleRemove={handleRemove}
              />
            </li>
          ))}
        </AnimatePresence>
      </ul>

      <AddItem />
    </div>
  );
};

export default Checklist;
