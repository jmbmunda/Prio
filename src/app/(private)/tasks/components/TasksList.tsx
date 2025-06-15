"use client";

import { DragOverlay } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useContextMenu } from "react-contexify";
import { createPortal } from "react-dom";
import { MdAdd } from "react-icons/md";

import Droppable from "@/components/Droppable";
import { COLUMN_MENU_ID, TASK_MENU_ID } from "@/lib/constants";
import { determineHexContrast } from "@/lib/helpers";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

import useColumn from "../hooks/useColumn";
import useTask from "../hooks/useTask";
import { ColumnType } from "../utils/types";
import ColumnMenu from "./ContextMenu/ColumnMenu";
import TaskMenu from "./ContextMenu/TaskMenu";
import TaskCard from "./TaskCard";

type Props = {
  columns: ColumnType[];
  activeTask: Task | null;
  onAddTaskClick: (columnId: string, tasks: Task[]) => void;
};

const TasksList = ({ columns, activeTask, onAddTaskClick }: Props) => {
  const { show } = useContextMenu({ id: COLUMN_MENU_ID });
  const { onTaskClick, onDeleteTaskClick } = useTask();
  const { onAddColumnClick, onEditColumnClick, onDeleteColumnClick } =
    useColumn();

  return (
    <>
      <div
        className={cn(
          "flex flex-row flex-grow gap-4 w-full h-[70vh] overflow-x-auto min-h-[70vh]",
        )}
      >
        {columns.map(({ name, tasks, id, color }) => (
          <SortableContext
            key={id}
            id={id}
            items={tasks}
            strategy={rectSortingStrategy}
          >
            <Droppable
              id={id}
              className="overflow-visible h-full min-w-60 flex flex-col"
            >
              <div
                onContextMenu={(e) => {
                  show({
                    event: e,
                    position: { x: e.clientX, y: e.clientY },
                    props: { name, tasks, id, color },
                  });
                }}
                className={cn(
                  `flex justify-between items-center rounded-lg p-2`,
                )}
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-base font-bold",
                      determineHexContrast(color)
                        ? "text-gray-800"
                        : "text-white",
                    )}
                  >
                    {name}
                  </p>
                  <span
                    className={cn(
                      "px-2 text-gray-500 font-semibold rounded-md text-xs bg-gray-100 bg-opacity-50",
                    )}
                  >
                    {tasks.length}
                  </span>
                </div>
                <MdAdd
                  className={cn(
                    "cursor-pointer hover:scale-110",
                    determineHexContrast(color)
                      ? "text-gray-800"
                      : "text-white",
                  )}
                  onClick={() => onAddTaskClick(id, tasks)}
                />
              </div>
              <div
                className={cn(
                  "h-full max-w-full py-2 space-y-2 rounded-br-md rounded-bl-md overflow-x-visible overflow-y-auto",
                )}
              >
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                ))}
              </div>
            </Droppable>
          </SortableContext>
        ))}
        {/* ADD COLUMN */}
        <button onClick={onAddColumnClick} className="group">
          <div className="invisible group-hover:visible grid place-items-center bg-muted text-gray-400 rounded-lg cursor-pointer overflow-visible h-full w-60 border-2 border-dashed transition-all">
            <div className="flex gap-1 items-center">
              <MdAdd />
              <p>Add Column</p>
            </div>
          </div>
        </button>
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} onClick={onTaskClick} />}
        </DragOverlay>,
        document.body,
      )}
      {createPortal(
        <ColumnMenu
          id={COLUMN_MENU_ID}
          onEditClick={onEditColumnClick}
          onDeleteClick={onDeleteColumnClick}
        />,
        document.body,
      )}
      {createPortal(
        <TaskMenu
          id={TASK_MENU_ID}
          onEditClick={onEditColumnClick}
          onDeleteClick={onDeleteTaskClick}
        />,
        document.body,
      )}
    </>
  );
};

export default TasksList;
