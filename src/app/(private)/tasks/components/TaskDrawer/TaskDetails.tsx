"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdOutlineDateRange, MdOutlineDescription } from "react-icons/md";
import { LuTags } from "react-icons/lu";
import { getTaskById } from "@/actions/tasks";
import { useForm } from "react-hook-form";
import { determineHexContrast } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { EditFields } from "./types";
import dayjs from "dayjs";
import TextArea from "@/components/Textarea";
import Image from "next/image";
import Input from "@/components/Input";
import DropdownMenu from "@/components/DropdownMenu";
import Tags from "./Tags";

type Props = {
  details: Awaited<ReturnType<typeof getTaskById>> | null | undefined;
};

const TaskDetails = ({ details }: Props) => {
  const { control, getValues, reset } = useForm();
  const [editingField, setEditingField] = useState<EditFields | null>(null);

  const handleEdit = (field: EditFields) => {
    setEditingField(field);
  };

  const onDoneEdit = () => {
    setEditingField(null);
  };

  useEffect(() => {
    if (details) reset(details);
  }, [reset, details]);

  if (!details) return null; // TODO: add loading state

  return (
    <div className="flex flex-col w-full">
      {editingField === "title" ? (
        <Input
          name="title"
          control={control}
          autoFocus
          onBlur={onDoneEdit}
          className="text-4xl font-semibold my-4 px-2 py-1 bg-transparent border-none data-[focus]:outline-foreground/10"
        />
      ) : (
        <button
          className="w-full text-start text-4xl rounded-lg px-2 py-1 font-semibold my-4 hover:bg-muted/70 cursor-text "
          onClick={() => handleEdit("title")}
        >
          {details?.title}
        </button>
      )}

      <div className="space-y-2">
        <div className="flex gap-4">
          <div className="space-y-2">
            <span className="flex gap-2 items-center text-muted-foreground">
              <HiOutlineStatusOnline /> Status:
            </span>
            <span className="flex gap-2 text-nowrap items-center text-muted-foreground">
              <MdOutlineDateRange /> Due Date:
            </span>
            <span className="flex gap-2 items-center text-muted-foreground">
              <LuTags /> Tags:
            </span>
          </div>

          <div className="space-y-2">
            {/* STATUS */}
            <DropdownMenu
              placeholder={details?.status?.name}
              items={[
                { label: "Tag 1", value: "Tag 1", id: "1" },
                { label: "Tag 2", value: "Tag 2", id: "2" }, // TODO: Replace with API
              ]}
              className={cn(
                "cursor-pointer w-fit font-semibold px-2 py-1 rounded-md text-sm border-none",
                !!determineHexContrast(details?.status?.color) ? "text-black" : "text-white"
              )}
              style={{ backgroundColor: details?.status?.color }}
            />
            {/* DUE DATE */}
            <div className="flex items-center">
              <p>{dayjs(details?.created_at?.toString()).format("D MMM YYYY")}</p>
            </div>
            {/* TAGS */}
            {details && <Tags taskId={details.id} tags={details.tags} />}
          </div>
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
                  getValues("description").length,
                  getValues("description").length
                )
              }
              control={control}
              autoFocus
              className="min-h-32 max-h-32 resize-none rounded-2xl data-[focus]:outline-foreground/10"
              onBlur={onDoneEdit}
            />
          ) : (
            <div
              role="button"
              className="w-full min-h-32 max-h-32 rounded-2xl border-none py-1.5 px-3 text-sm/6 cursor-text bg-muted/70 hover:bg-foreground/5"
              onClick={() => handleEdit("description")}
            >
              {details?.description}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <span className="flex gap-2 items-center text-muted-foreground">
            <MdOutlineDescription />
            Photos:
          </span>
          {details?.images.length ? (
            <div className="flex gap-2">
              {details?.images.map((image) => (
                <Image
                  key={image.id}
                  src={image.url}
                  width={100}
                  height={100}
                  alt={image.name}
                  className="object-contain rounded-lg"
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center">No photos attached</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
