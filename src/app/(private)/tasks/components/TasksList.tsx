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
import { RIGHT_CLICK_MENU_ID, TASK_DRAWER_ID } from "@/lib/constants";
import { useModal } from "@/context/modal";
import ColumnEditorModal from "./Columns/ColumnEditorModal";
import { determineHexContrast } from "@/lib/helpers";
import { ItemParams, useContextMenu } from "react-contexify";
import ColumnMenu from "./ContextMenu/ColumnMenu";
import ConfirmationModal from "@/components/ConfirmationModal";
import { deleteStatus } from "@/actions/status";
import toast from "react-hot-toast";

type Props = {
  columns: ColumnType[];
  activeTask: Task | null;
  onAddTaskClick: (columnId: string, tasks: Task[]) => void;
};

const TasksList = ({ columns, activeTask, onAddTaskClick }: Props) => {
  const { openDrawer } = useDrawer();
  const { showModal } = useModal();
  const { show } = useContextMenu({ id: RIGHT_CLICK_MENU_ID });

  const onAddColumnClick = () => {
    showModal({
      id: "add-column",
      component: ColumnEditorModal,
      title: "New Column",
      props: { type: "ADD" },
    });
  };

  const onEditColumnClick = ({ props: { name, id, color } }: ItemParams) => {
    showModal({
      id: "edit-column",
      component: ColumnEditorModal,
      title: "Update Column",
      props: { id, name, color, type: "EDIT" },
    });
  };

  //TODO : Improve delete user experrience

  const onDeleteColumnClick = ({ props: { id } }: ItemParams) => {
    showModal({
      id: "confirmation",
      component: ConfirmationModal,
      props: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete this column?",
        onConfirmClick: async () => {
          try {
            const res = await deleteStatus(id);
            if (res) toast.success("Deleted!");
          } catch {
            toast.error("Failed to delete column");
          }
        },
        confirmLabel: "Delete",
        confirmBtnProps: { variant: "destructive" },
        cancelBtnProps: { variant: "default" },
      },
    });
  };

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
            <Droppable id={id} className="overflow-visible h-full min-w-60 flex flex-col">
              <div
                onContextMenu={(e) => {
                  show({
                    event: e,
                    position: { x: e.clientX, y: e.clientY },
                    props: { name, tasks, id, color },
                  });
                }}
                className={cn(`flex justify-between items-center rounded-lg p-2`)}
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "text-base font-bold",
                      determineHexContrast(color) ? "text-gray-800" : "text-white"
                    )}
                  >
                    {name}
                  </p>
                  <span
                    className={cn(
                      "px-2 text-gray-500 font-semibold rounded-md text-xs bg-gray-100 bg-opacity-50"
                    )}
                  >
                    {tasks.length}
                  </span>
                </div>
                <MdAdd
                  className={cn(
                    "cursor-pointer hover:scale-110",
                    determineHexContrast(color) ? "text-gray-800" : "text-white"
                  )}
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
        document.body
      )}
      {createPortal(
        <ColumnMenu
          id={RIGHT_CLICK_MENU_ID}
          onEditClick={onEditColumnClick}
          onDeleteClick={onDeleteColumnClick}
        />,
        document.body
      )}
    </>
  );
};

export default TasksList;
