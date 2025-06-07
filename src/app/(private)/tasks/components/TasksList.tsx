"use client";

import React from "react";
import TaskCard from "./TaskCard";
import Droppable from "@/components/Droppable";
import { cn } from "@/lib/utils";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";
import { Task } from "@/lib/types";
import { ColumnType } from "../utils/types";
import { MdAdd } from "react-icons/md";
import { useDrawer } from "@/context/drawer";
import { TASK_DRAWER_ID } from "@/lib/constants";

type Props = {
  columns: ColumnType[];
  activeTask: Task | null;
  onAddTaskClick: (columnId: string, tasks: Task[]) => void;
};

const TasksList = ({ columns, activeTask, onAddTaskClick }: Props) => {
  const { openDrawer } = useDrawer();

  const onTaskClick = (task: Task) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("id", task.id);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
    openDrawer(TASK_DRAWER_ID);
  };

  return (
    <>
      <div
        className={cn("flex flex-row flex-grow gap-4 w-full h-[70vh] overflow-x-auto min-h-[70vh]")}
      >
        {columns.map(({ name, tasks, id, color }) => (
          <SortableContext key={id} id={id} items={tasks} strategy={rectSortingStrategy}>
            <Droppable id={id} className="overflow-visible h-full w-60 flex flex-col">
              <div
                className={cn(`flex justify-between items-center rounded-lg p-2`)}
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-2">
                  <p className="text-gray-800 text-base font-bold">{name}</p>
                  <span
                    className={cn(
                      "px-2 text-gray-500 font-semibold rounded-md text-xs bg-gray-100 bg-opacity-50"
                    )}
                  >
                    {tasks.length}
                  </span>
                </div>
                <MdAdd
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => onAddTaskClick(id, tasks)}
                />
              </div>
              <div
                className={cn(
                  "h-full max-w-full py-2 space-y-2 rounded-br-md rounded-bl-md overflow-x-visible overflow-y-auto"
                )}
              >
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                ))}
              </div>
            </Droppable>
          </SortableContext>
        ))}
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} onClick={onTaskClick} />}
        </DragOverlay>,
        document.body
      )}
    </>
  );
};

export default TasksList;
