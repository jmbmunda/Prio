"use client";

import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { useContextMenu } from "react-contexify";
import { CiClock2 } from "react-icons/ci";
import { GoCommentDiscussion } from "react-icons/go";

import Sortable from "@/components/Sortable";
import { MAP_PRIORITY_COLOR, TASK_MENU_ID } from "@/lib/constants";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = { task: Task; onClick: (task: Task) => void };

const TaskCard = ({ task, onClick }: Props) => {
  const { show } = useContextMenu({ id: TASK_MENU_ID });

  const displayDueDate = () => {
    if (!task?.due_date) return "-";
    const daysLeft = dayjs(task?.due_date).diff(dayjs(), "days");
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due now";
    return `${daysLeft} days left`;
  };

  return (
    <Sortable
      id={task.id}
      className="shadow-md bg-background p-4 rounded-md cursor-pointer"
      onClick={() => onClick(task)}
    >
      <div
        onContextMenu={(e) => {
          show({
            event: e,
            position: { x: e.clientX, y: e.clientY },
            props: { id: task.id, status_id: task.status_id, priority: task.priority },
          });
        }}
      >
        {/* HEADER */}
        <div className="flex gap-2 mb-2 items-center justify-between text-xs">
          <p
            className={cn("font-semibold px-2 rounded-md capitalize")}
            style={MAP_PRIORITY_COLOR[task.priority!]}
          >
            {task?.priority?.toLowerCase()}
          </p>
          <p className="text-muted-foreground">{task.id}</p>
        </div>
        <p className="font-semibold text-primary truncate">{task.title}</p>
        <p className="text-xs text-accent-foreground truncate text-nowrap">{task.description}</p>
        <div className="grid grid-cols-7 h-[1.5rem] overflow-x-hidden my-2">
          {task?.images?.map((image) => (
            <Image
              key={image.url}
              src={image.url ?? ""}
              alt=""
              width={96}
              height={96}
              className="w-[1.5rem] h-[1.5rem] object-cover rounded-sm"
            />
          ))}
          {task.images && task.images?.length > 6 && (
            <button className="w-[1.5rem] h-[1.5rem] text-[0.5rem] text-gray-800 bg-gray-200 rounded-sm">
              {task.images?.length}
            </button>
          )}
        </div>
        {/* ------ */}
        <div className="bg-gray-300 h-[0.08rem] my-4" />
        {/* ------ */}
        <div className="flex justify-between gap-2 text-xs text-muted-foreground">
          <p className="flex gap-1 items-center">
            <CiClock2 /> {displayDueDate()}
          </p>

          <span className="flex gap-1 items-center hover:text-gray-800">
            <GoCommentDiscussion />
            10
          </span>
        </div>
      </div>
    </Sortable>
  );
};

export default TaskCard;
