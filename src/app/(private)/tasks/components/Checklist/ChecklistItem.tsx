"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  id: string;
  text: string;
  checked: boolean;
  handleChange: (id: string, checked: boolean) => void;
  handleRemove: (id: string) => void;
};

const ChecklistItem = ({ id, text, checked, handleChange, handleRemove }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <motion.div
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
              setIsChecked((prev) => !prev);
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
          <RxCross2
            onClick={() => handleRemove(id)}
            className="cursor-pointer text-gray-500 hover:text-black"
          />
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(ChecklistItem);
