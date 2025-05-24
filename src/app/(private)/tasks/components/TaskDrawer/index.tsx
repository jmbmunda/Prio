"use client";

import { getTaskById } from "@/actions/tasks";
import Drawer from "@/components/Drawer";
import { useDrawer } from "@/context/drawer";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import TaskDetails from "./TaskDetails";

const TASK_DRAWER_ID = "task-drawer";

const TaskDrawer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: details, isLoading } = useSWR(
    id ? ["task-details", id] : null,
    ([, id]) => getTaskById(id),
    { keepPreviousData: true }
  );

  const { openDrawers, closeDrawer } = useDrawer();
  const isActiveDrawer = openDrawers.includes(TASK_DRAWER_ID);

  const handleDrawerClose = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("id");
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
    closeDrawer(TASK_DRAWER_ID);
  };

  return (
    <Drawer
      show={isActiveDrawer}
      position="right"
      close={handleDrawerClose}
      closeOnEscape
      closeOnOverlayClick
      isFloating={true}
    >
      <div className="w-[500px] mx-2">
        {isLoading ? <p>Loading...</p> : <TaskDetails details={details} />}
      </div>
    </Drawer>
  );
};

export default TaskDrawer;
