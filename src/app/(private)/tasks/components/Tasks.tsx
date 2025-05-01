"use client";

import React from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { useModal } from "@/context/modal";
import { ColumnType } from "../utils/types";
import useTasks from "../hooks/useTasks";
import TaskEditorModal from "./TaskEditorModal";
import dynamic from "next/dynamic";
import { Task } from "@/lib/types";

const TasksList = dynamic(() => import("./TasksList"), { ssr: false });

type Props = {
  data: ColumnType[];
};

const Tasks = ({ data }: Props) => {
  const { columns, sensors, activeTask, handleDragEnd, handleDragOver, handleDragStart } =
    useTasks(data);
  const { showModal } = useModal();

  const onAddTaskClick = (status_id: string, tasks: Task[]) => {
    showModal({
      id: "add-task",
      title: "Add Task",
      component: TaskEditorModal,
      props: { columns, editValues: { status_id }, totalTasks: tasks.length, onClose: () => {} },
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
