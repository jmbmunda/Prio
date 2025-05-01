"use client";

import React, { useTransition } from "react";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import { createTask, Payload } from "@/actions/tasks";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { Props, TaskPayload } from "./utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "./utils/schema";
import TextArea from "@/components/Textarea";
import UploadButton from "@/components/UploadButton";
import { UploadcareFile } from "@uploadcare/upload-client";
import Image from "next/image";
import { MdUpload } from "react-icons/md";

const TaskEditorModal = ({ columns, editValues, totalTasks, onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, setValue, watch } = useForm<TaskPayload>({
    defaultValues: {
      title: editValues?.title ?? "",
      description: editValues?.description ?? "",
      status_id: editValues?.status_id ?? "",
      images: editValues?.images ?? [],
    },
    resolver: zodResolver(taskSchema),
  });

  const statuses = columns?.map((column) => ({ label: column.name, value: column.id })) ?? [];
  const images = watch("images");

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
        <Dropdown label="Status" name="status_id" control={control} options={statuses} />

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
