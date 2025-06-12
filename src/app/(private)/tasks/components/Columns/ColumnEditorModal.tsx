"use client";

import React, { useTransition } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { createStatus, updateStatus } from "@/actions/status";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { columnSchema } from "./utils/schema";
import { ColumnPayload, Props } from "./utils/types";
import "react-color-palette/css";
import ColorPicker from "@/components/ColorPicker";
import toast from "react-hot-toast";

const ColumnEditorModal = ({ type, id, name, color, onClose }: Props) => {
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name ?? "",
      color: color ?? "#808080",
    },
    resolver: zodResolver(columnSchema),
  });

  const onSubmit = (data: ColumnPayload) => {
    startTransition(async () => {
      try {
        const actionMaps = {
          ADD: async () => {
            const res = await createStatus(data);
            if (res.id) toast.success("Created new column!");
          },
          EDIT: async () => {
            const res = await updateStatus(id, data);
            if (res.id) toast.success("Column updated!");
          },
        };
        await actionMaps[type]?.();
        onClose?.();
      } catch {
        toast.error("Something went wrong, try again later");
      }
    });
  };

  const getSubmitLabel = () => {
    const LABEL: Record<typeof type, string> = {
      ADD: isPending ? "Adding..." : "Add",
      EDIT: isPending ? "Updating..." : "Update",
    };
    return LABEL[type] ?? "Submit";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 pt-4">
        <Input name="name" control={control} placeholder="Enter name" />
        <ColorPicker
          name="color"
          control={control}
          label="Color: "
          showColor
          defaultValue={getValues("color")}
          height={150}
          error={errors.color}
        />
        <div className="h-[1px] bg-gray-500/20 w-full my-2" />
      </div>
      <div className="mt-2">
        <Button type="submit" disabled={isPending}>
          {isPending && <CgSpinner className="animate-spin text-base" />}
          {getSubmitLabel()}
        </Button>
      </div>
    </form>
  );
};

export default ColumnEditorModal;
