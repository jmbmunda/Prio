"use client";

import React, { useEffect, useState } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import dayjs from "dayjs";
import { MdOutlineDateRange, MdOutlineDescription } from "react-icons/md";
import { LuTags } from "react-icons/lu";
import TextArea from "@/components/Textarea";
import { getTaskById } from "@/actions/tasks";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { EditFields } from "./types";
import Input from "@/components/Input";
import { determineHexContrast } from "@/lib/helpers";
import { cn } from "@/lib/utils";

type Props = {
  details: Awaited<ReturnType<typeof getTaskById>>;
};

const Form = ({ details }: Props) => {
  const { control, getValues, reset } = useForm();
  const [editingField, setEditingField] = useState<EditFields | null>(null);

  const handleEdit = (field: EditFields) => {
    setEditingField(field);
  };

  console.log(details?.status?.color);

  const onDoneEdit = () => {
    setEditingField(null);
  };

  useEffect(() => {
    if (details) reset(details);
  }, [reset, details]);

  return (
    <>
      {editingField === "title" ? (
        <Input
          name="title"
          control={control}
          autoFocus
          onBlur={onDoneEdit}
          className="text-4xl font-semibold my-4 px-2 py-1 bg-transparent border-none data-[focus]:outline-foreground/10"
        />
      ) : (
        <p
          className="text-4xl rounded-lg px-2 py-1 font-semibold my-4 hover:bg-muted/70 cursor-text "
          onClick={() => handleEdit("title")}
        >
          {details?.title}
        </p>
      )}

      <div className="space-y-2">
        <div className="flex gap-4">
          {/* LABELS */}
          <div className="space-y-2">
            <span className="flex gap-2 items-center text-muted-foreground">
              <HiOutlineStatusOnline /> Status:
            </span>
            <span className="flex gap-2 items-center text-muted-foreground">
              <MdOutlineDateRange /> Due Date:
            </span>
            <span className="flex gap-2 items-center text-muted-foreground">
              <LuTags /> Tags:
            </span>
          </div>
          {/* VALUES */}
          <div className="space-y-2">
            <p
              className={cn(
                "cursor-pointer w-fit font-semibold px-2 py-1 rounded-lg text-sm",
                !!determineHexContrast(details?.status?.color) ? "text-black" : "text-white"
              )}
              style={{ backgroundColor: details?.status?.color }}
            >
              {details?.status?.name}
            </p>
            <p>{dayjs(details?.created_at?.toString()).format("D MMM YYYY")}</p>
            <p>-</p>
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
            <p
              className="block w-full min-h-32 max-h-32 rounded-2xl border-none py-1.5 px-3 text-sm/6 cursor-text bg-muted/70 hover:bg-foreground/5"
              onClick={() => handleEdit("description")}
            >
              {details?.description}
            </p>
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
    </>
  );
};

export default Form;
