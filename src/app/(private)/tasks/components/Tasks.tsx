"use client";

import React from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { useModal } from "@/context/modal";
import { ColumnType } from "../utils/types";
import useTasks from "../hooks/useTasks";
import TaskEditorModal from "./TaskEditorModal";
import dynamic from "next/dynamic";

const TasksList = dynamic(() => import("./TasksList"), { ssr: false });

// TODO: save the placement index in the db

type Props = {
  statuses: ColumnType[];
};

const Tasks = ({ statuses }: Props) => {
  const { columns, sensors, activeTask, handleDragEnd, handleDragOver, handleDragStart } =
    useTasks(statuses);
  const { showModal } = useModal();

  const onAddTaskClick = (status_id: string, totalTasks: number) => {
    showModal({
      id: "add-task",
      title: "Add Task",
      component: TaskEditorModal,
      props: { columns, editValues: { status_id }, totalTasks, onClose: () => {} },
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <TasksList columns={columns} activeTask={activeTask} onAddTaskClick={onAddTaskClick} />
    </DndContext>
  );
};

export default Tasks;
