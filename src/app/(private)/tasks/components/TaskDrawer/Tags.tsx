"use client";

import React from "react";
import DropdownMenu from "@/components/DropdownMenu";
import { Tag } from "@/lib/types";
import { CgCloseO } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { determineHexContrast } from "@/lib/helpers";
import { Control, FieldValues } from "react-hook-form";
import useTaskTags from "../../hooks/useTaskTags";

type Props = { taskId: string; tags: Tag[]; control: Control<FieldValues> };

const Tags = ({ taskId, tags = [], control }: Props) => {
  const { optimisticTags, options, handleAssignTag, handleRemoveTag } = useTaskTags(taskId, tags);

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
        <DropdownMenu name="tags" control={control} items={options} onChange={handleAssignTag}>
          <p className="font-light text-muted-foreground text-sm">+ Add Tag</p>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Tags;
