"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdOutlineDateRange, MdOutlineDescription } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { LuTags } from "react-icons/lu";
import { getTaskById, updateTask } from "@/actions/tasks";
import { useForm } from "react-hook-form";
import { EditFields } from "./types";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import TextArea from "@/components/Textarea";
import Image from "next/image";
import Input from "@/components/Input";
import Tags from "./Tags";
import Status from "./Status";
import UploadFile from "@/components/UploadFile";
import { TaskPayload } from "../TaskEditorModal/utils/types";
import DetailsRow from "./DetailsRow";
import { mutate } from "swr";
import { deleteAndUpdateFile, deleteFile } from "@/actions/files";

type Props = {
  details: Awaited<ReturnType<typeof getTaskById>> | null | undefined;
};

const TaskDetails = ({ details }: Props) => {
  const {
    control,
    getValues,
    watch,
    reset,
    formState: { dirtyFields },
  } = useForm();
  const [editingField, setEditingField] = useState<EditFields | null>(null);

  const handleEdit = (field: EditFields) => {
    setEditingField(field);
  };

  const onDoneEditField = async () => {
    if (!editingField || !details) return;
    setEditingField(null);

    if (!dirtyFields[editingField]) return;

    const value = getValues(editingField);
    await updateTask(details.id, { [editingField]: value });
  };

  useEffect(() => {
    if (details) reset({ ...details, status: details.status?.name });
  }, [reset, details]);

  if (!details) return null; // TODO: add loading state

  return (
    <div className="flex flex-col w-full">
      {editingField === "title" ? (
        <Input
          name="title"
          control={control}
          autoFocus
          onBlur={onDoneEditField}
          className="text-4xl font-semibold my-4 px-2 py-1 bg-transparent border-none data-[focus]:outline-foreground/10"
        />
      ) : (
        <button
          className="w-full text-start text-4xl rounded-lg px-2 py-1 font-semibold my-4 hover:bg-muted/70 cursor-text "
          onClick={() => handleEdit("title")}
        >
          {getValues("title")}
        </button>
      )}

      <div className="space-y-2">
        <div className="space-y-2">
          <DetailsRow label="Status:" icon={<HiOutlineStatusOnline />}>
            <Status taskId={details.id} control={control} watch={watch} />
          </DetailsRow>
          <DetailsRow label="Due Date:" icon={<MdOutlineDateRange />}>
            <p>
              {details?.due_date ? dayjs(details?.due_date?.toString()).format("D MMM YYYY") : "-"}
            </p>
          </DetailsRow>
          <DetailsRow label="Tags" icon={<LuTags />}>
            <Tags taskId={details.id} tags={details.tags} control={control} />
          </DetailsRow>
        </div>

        <div className="space-y-2">
          <span className="flex gap-2 items-center text-muted-foreground">
            <MdOutlineDescription />
            Description:
          </span>
          {editingField === "description" ? (
            <TextArea
              name="description"
              ref={(textarea) =>
                textarea?.setSelectionRange(
                  getValues("description")?.length ?? 0,
                  getValues("description")?.length ?? 0
                )
              }
              control={control}
              autoFocus
              className="min-h-32 max-h-32 resize-none rounded-2xl data-[focus]:outline-foreground/10"
              onBlur={onDoneEditField}
            />
          ) : (
            <button
              className="w-full flex min-h-32 max-h-32 rounded-2xl border-none py-1.5 px-3 text-sm/6 cursor-text bg-muted/70 hover:bg-foreground/5"
              onClick={() => handleEdit("description")}
            >
              {getValues("description")}
            </button>
          )}
        </div>
        <div className="space-y-2 py-2 border-b">
          <span className="flex gap-2 items-center text-muted-foreground">
            <MdOutlineDescription />
            Photos:
          </span>
          {details?.images.length ? (
            <div className="flex gap-2 overflow-x-auto w-full">
              {details?.images.map((image) => (
                <div key={image.id} className="relative">
                  <Image
                    key={image.id}
                    src={image.url}
                    width={100}
                    height={100}
                    alt={image.name}
                    className="object-contain rounded-lg"
                  />
                  <FaMinusCircle
                    className="absolute top-1 right-1 cursor-pointer text-red-500 bg-white rounded-full hover:text-red-600 active:scale-90"
                    onClick={async () => {
                      if (!image.uuid) return;
                      try {
                        await deleteAndUpdateFile(details.id, image.uuid, image.id);
                        mutate(["task-details", details.id]); // TODO: Improve UI & UX (add loading, disabled state, close button style, etc.)
                      } catch (error) {
                        console.error("Failed to delete file", error);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">No photos attached</p>
          )}
          <div
            className={cn(
              "grid",
              details.images.length ? "place-items-start" : "place-items-center"
            )}
          >
            <UploadFile
              type="regular"
              imgOnly
              className="my-4"
              onFileRemoved={async (e) => {
                if (!e.uuid) return;
                await deleteFile(e.uuid);
              }}
              onDoneClick={async (e) => {
                if (e.successEntries.length === 0) return;
                const files: TaskPayload["images"] = e.successEntries.map((entry) => ({
                  name: entry.name,
                  url: entry.cdnUrl!,
                  uuid: entry.uuid,
                }));
                try {
                  await updateTask(details.id, { images: files });
                  mutate(["task-details", details.id]);
                } catch (error) {
                  console.error("Failed to update task", error);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
