"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { mockTasksData } from "../utils/constants";
import TaskCard from "./TaskCard";
import Droppable from "@/components/Droppable";
import useTasks from "../hooks/useTasks";

const Tasks = () => {
  const { columns, sensors, activeTask, handleDragEnd, handleDragOver, handleDragStart } =
    useTasks(mockTasksData);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        className={cn("flex flex-row flex-grow gap-4 w-full h-[70vh] overflow-x-auto min-h-[70vh]")}
      >
        {/* COLUMN */}
        {columns.map(({ title, tasks, id, color }) => (
          <SortableContext key={id} id={id} items={tasks} strategy={rectSortingStrategy}>
            <Droppable id={id} className="overflow-visible h-full w-60 flex flex-col">
              <div
                className={cn(`flex justify-between items-center rounded-lg p-2`)}
                style={{ backgroundColor: color }}
              >
                <p className="text-gray-800 text-base font-bold">{title}</p>
                <span
                  className={cn(
                    "px-2 text-gray-500 font-semibold rounded-md text-xs bg-gray-100 bg-opacity-50"
                  )}
                >
                  {tasks.length}
                </span>
              </div>
              <div
                className={cn(
                  "h-full max-w-full py-2 space-y-2 rounded-br-md rounded-bl-md overflow-x-visible overflow-y-auto"
                )}
              >
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </Droppable>
          </SortableContext>
        ))}
      </div>
      {createPortal(
        <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default Tasks;
