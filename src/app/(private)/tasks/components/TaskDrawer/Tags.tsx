"use client";

import React, { useOptimistic, useTransition } from "react";
import DropdownMenu from "@/components/DropdownMenu";
import { assignTagToTask, getTags, unassignTagFromTask } from "@/actions/tags";
import { Tag } from "@/lib/types";
import { CgCloseO } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { determineHexContrast } from "@/lib/helpers";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

type Props = { taskId: string; tags: Tag[] };

const Tags = ({ taskId, tags = [] }: Props) => {
  const { data: tagList } = useSWR("tags", getTags);
  const [, startTransition] = useTransition();
  const [optimisticTags, addOptimisticTags] = useOptimistic<Tag[], { type: string; data: Tag }>(
    tags,
    (state, action) => {
      switch (action.type) {
        case "add":
          return [...new Set([...state, action.data])];
        case "delete":
          return state.filter((tag) => tag.id !== action.data.id);
        default:
          return state;
      }
    }
  );

  const options =
    tagList
      ?.filter((item) => !optimisticTags?.some((tag) => tag.id === item.id))
      .map((item) => ({ ...item, label: item.name, value: item.name })) ?? [];

  const handleAssignTag = async (item: Tag) => {
    startTransition(() => {
      addOptimisticTags({ type: "add", data: item });
    });
    try {
      const res = await assignTagToTask(item.id, taskId);
      if (res.success) {
        mutate(
          ["task-details", taskId],
          (prevData) => {
            return {
              ...prevData,
              tags: [...prevData.tags, item],
            };
          },
          false
        );
      }
    } catch {
      toast.error("Failed to assign tag");
    }
  };

  const handleRemoveTag = async (item: Tag) => {
    startTransition(() => {
      addOptimisticTags({ type: "delete", data: item });
    });
    try {
      const res = await unassignTagFromTask(item.id, taskId);
      if (res.success) {
        mutate(["task-details", taskId]);
      }
    } catch {
      toast.error("Failed to remove tag");
    }
  };

  return (
    <div className="flex gap-2 items-center flex-wrap w-full flex-shrink-0">
      {optimisticTags?.map((tag) => (
        <div
          key={tag.id}
          className={"px-2 py-1 text-sm rounded-md relative group"}
          style={{
            backgroundColor: tag?.color ?? "#e5e7eb",
          }}
        >
          <CgCloseO
            className="absolute -top-1 -right-1 text-sm z-10 cursor-pointer hidden text-white bg-black rounded-full group-hover:block"
            onClick={() => handleRemoveTag(tag)}
          />
          <span
            className={cn(
              tag.color && !!determineHexContrast(tag.color) ? "text-black" : "text-white"
            )}
          >
            {tag.name}
          </span>
        </div>
      ))}
      {options?.length > 0 && (
        <DropdownMenu items={options} onChange={handleAssignTag}>
          <p className="font-light text-muted-foreground text-sm">+ Add Tag</p>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Tags;
