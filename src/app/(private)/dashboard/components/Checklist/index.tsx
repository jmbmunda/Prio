import React from "react";
import ChecklistItem from "./ChecklistItem";
import { getChecklist } from "@/actions/checklist";
import AddItem from "./AddItem";
import { AnimatePresence } from "motion/react";

//   TODO: Add empty state
// TODO: Customize styling

export default async function Checklist() {
  const checklistData = await getChecklist();

  return (
    <ul className="space-y-4 overflow-y-auto h-[50vh]">
      {!!checklistData?.length ? (
        <>
          <AnimatePresence key="checklist">
            {checklistData?.map((checklist) => (
              <div key={checklist.id} className="space-y-4 flex flex-col">
                <ChecklistItem
                  id={checklist.id}
                  text={checklist.text}
                  checked={checklist.is_checked}
                />
              </div>
            ))}
          </AnimatePresence>
          <AddItem />
        </>
      ) : (
        <AddItem />
      )}
    </ul>
  );
}
