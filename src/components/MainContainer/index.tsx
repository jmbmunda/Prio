"use client";

import { motion } from "motion/react";
import React from "react";

import TaskDrawer from "@/app/(private)/tasks/components/TaskDrawer";
import { cn } from "@/lib/utils";

import Navbar from "../Navbar";
import { Props } from "./types";

const MainContainer = ({ children }: Props) => {
  return (
    <main className={cn(`flex h-screen`)}>
      <Navbar />
      <motion.div className="container py-4">{children}</motion.div>
      <TaskDrawer />
    </main>
  );
};

export default MainContainer;
