"use client";

import { createTask } from "@/actions/tasks";
import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@headlessui/react";
import { Task } from "@prisma/client";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { ColumnType } from "../utils/types";

export type TaskEditorModalProps = {
  columns?: ColumnType[];
  editValues?: Task | null;
  totalTasks?: number;
  onClose: () => void;
};

const TaskEditorModal = ({ columns, editValues, totalTasks, onClose }: TaskEditorModalProps) => {
  const [isPending, startTransition] = useTransition();

  const statuses = columns?.map((column) => ({ label: column.name, value: column.id })) ?? [];

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const toastID = toast.loading("Adding a task...");
      try {
        const data = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          status_id: formData.get("status_id") as string,
          slot: totalTasks ? totalTasks + 1 : 0,
        };
        await createTask(data);
        toast.success("Task added!", { id: toastID });
        onClose();
      } catch {
        toast.error("Failed to add a task", { id: toastID });
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={editValues?.title ?? ""}
          name="title"
          placeholder="Enter task name"
          className={cn(
            "mt-3 block w-full rounded-lg border-none bg-foreground/5 py-1.5 px-3 text-sm/6 ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-foreground/25"
          )}
        />
        <Input
          defaultValue={editValues?.description ?? ""}
          name="description"
          placeholder="Enter description"
          className={cn(
            "mt-3 block w-full rounded-lg border-none bg-foreground/5 py-1.5 px-3 text-sm/6 ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-foreground/25"
          )}
        />
        <Dropdown
          name="status_id"
          options={statuses}
          defaultValue={statuses.find((status) => status.value === editValues?.status_id)}
          className="mt-3"
        />
      </div>
      <div className="mt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <CgSpinner className="animate-spin text-base" />}
          Add
        </Button>
      </div>
    </form>
  );
};

export default TaskEditorModal;
