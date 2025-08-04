"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import useSWR from "swr";

import { getTaskById } from "@/actions/tasks";
import Drawer from "@/components/Drawer";
import { useDrawer } from "@/context/drawer";

import TaskDetails from "./TaskDetails";
import TaskDetailsLoader from "./TaskDetailsLoader";

const TASK_DRAWER_ID = "task-drawer";

const TaskDrawer = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: details, isLoading } = useSWR(
    id ? ["task-details", id] : null,
    ([, id]) => getTaskById(id),
    {
      keepPreviousData: true,
    }
  );
  const { openDrawers, openDrawer, closeDrawer } = useDrawer();
  const isActiveDrawer = openDrawers.includes(TASK_DRAWER_ID);
  const openDrawerRef = useRef(openDrawer);

  useEffect(() => {
    if (!id || isActiveDrawer) return;
    openDrawerRef.current(TASK_DRAWER_ID);
  }, [id, isActiveDrawer]);

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
        {isLoading ? <TaskDetailsLoader /> : <TaskDetails details={details} />}
      </div>
    </Drawer>
  );
};

export default TaskDrawer;
