import React from "react";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { updateTask } from "@/actions/tasks";
import DropdownMenu from "@/components/DropdownMenu";
import { determineHexContrast } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import useTaskStatus from "../../hooks/useTaskStatus";

type Props = {
  taskId: string;
  control: Control<FieldValues, unknown, FieldValues>;
  watch: UseFormWatch<FieldValues>;
  placeholder?: string;
};

const Status = ({ taskId, control, watch, placeholder }: Props) => {
  const { statusOptions, getAttributes } = useTaskStatus();
  const status = watch("status");

  const handleChange = async (item: (typeof statusOptions)[number]) => {
    if (status === item.name) return;
    try {
      await updateTask(taskId, { status_id: item.id });
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <DropdownMenu
      name="status"
      control={control}
      placeholder={placeholder ?? status}
      items={statusOptions}
      onChange={handleChange}
      className={cn(
        "cursor-pointer w-fit font-semibold px-2 py-1 rounded-md text-sm border-none",
        determineHexContrast(getAttributes(status)?.color) ? "text-black" : "text-white"
      )}
      style={{ backgroundColor: getAttributes(status)?.color }}
    />
  );
};

export default Status;
