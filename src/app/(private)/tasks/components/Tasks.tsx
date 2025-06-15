"use client";

import { closestCorners, DndContext } from "@dnd-kit/core";
import dynamic from "next/dynamic";
import React from "react";

import { useModal } from "@/context/modal";
import { Task } from "@/lib/types";

import TaskEditorModal from "./TaskEditorModal";
import useTasks from "../hooks/useTasks";
import { ColumnType } from "../utils/types";


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
