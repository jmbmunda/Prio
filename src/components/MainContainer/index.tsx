"use client";

import React from "react";
import Navbar from "../Navbar";
import { Props } from "./types";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const MainContainer = ({ children }: Props) => {
  return (
    <main className={cn(`flex h-screen`)}>
      <Navbar />
      <motion.div className="container py-4">{children}</motion.div>
    </main>
  );
};

export default MainContainer;
