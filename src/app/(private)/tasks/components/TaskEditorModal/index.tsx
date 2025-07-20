"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadcareFile } from "@uploadcare/upload-client";
import Image from "next/image";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { MdUpload } from "react-icons/md";
import useSWR from "swr";

import { getStatuses } from "@/actions/status";
import { createTask, Payload } from "@/actions/tasks";
import DatePickerTime from "@/components/DatePickerTime";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/UploadButton";

import { taskSchema } from "./utils/schema";
import { Props, TaskPayload } from "./utils/types";

const TaskEditorModal = ({ editValues, totalTasks, onClose }: Props) => {
  const { data: statuses } = useSWR("statuses", getStatuses);
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, setValue, watch } = useForm<TaskPayload>({
    defaultValues: {
      title: editValues?.title ?? "",
      description: editValues?.description ?? "",
      start_date: editValues?.start_date,
      due_date: editValues?.due_date,
      status_id: editValues?.status_id ?? "",
      images: editValues?.images ?? [],
    },
    resolver: zodResolver(taskSchema),
  });

  const images = watch("images");
  const start_date = watch("start_date");
  const statusOptions = statuses?.map((status) => ({ label: status.name, value: status.id })) ?? [];
  const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
  ];

  const onUploadChange = (file: UploadcareFile) => {
    setValue("images", [...(images ?? []), { name: file.name, url: file.cdnUrl }]);
  };

  const onSubmit = (formData: TaskPayload) => {
    startTransition(async () => {
      const toastID = toast.loading("Adding a task...");
      try {
        const payload: Payload = {
          ...formData,
          images,
          slot: totalTasks ? totalTasks + 1 : 0,
        };
        await createTask(payload);
        toast.success("Task added!", { id: toastID });
        onClose();
      } catch {
        toast.error("Failed to add a task", { id: toastID });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Input label="Task" name="title" control={control} placeholder="Enter task name" />
        <TextArea
          label="Description"
          name="description"
          control={control}
          placeholder="Enter description"
        />
        <div className="flex gap-2">
          <DatePickerTime
            label="Start Date"
            name="start_date"
            control={control}
            dateFormat="MMM d, yyyy h:mm aa"
            containerClassName="flex-1"
          />
          <DatePickerTime
            label="Due Date"
            name="due_date"
            control={control}
            dateFormat="MMM d, yyyy h:mm aa"
            minDate={start_date || new Date()}
            containerClassName="flex-1"
          />
        </div>
        <div className="flex gap-2">
          <Dropdown label="Status" name="status_id" control={control} options={statusOptions} />
          <Dropdown label="Priority" name="priority" control={control} options={priorityOptions} />
        </div>

        <div className="h-[1px] bg-gray-500/20 w-full my-2" />

        <div className="space-y-2">
          {!!images.length && (
            <div className="flex gap-2 items-center h-20 w-full overflow-x-auto">
              {images.map((image) => (
                <Image
                  key={image.url}
                  src={image.url}
                  width={80}
                  height={80}
                  className="object-contain"
                  alt="Uploaded Image"
                />
              ))}
            </div>
          )}
          <UploadButton onUploadChange={onUploadChange}>
            <div className="flex gap-2 items-center text-sm">
              <MdUpload />
              Upload
            </div>
          </UploadButton>
        </div>
      </div>
      <div className="mt-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <CgSpinner className="animate-spin text-base" />}
          {isPending ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
};

export default TaskEditorModal;
