"use client";
import React, { createContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, type Transition } from "motion/react";

type DrawerContextProps = {
  show: boolean;
  open: () => void;
  close: () => void;
};

const DrawerContext = createContext<DrawerContextProps | null>(null);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  const open = () => setShow(true);
  const close = () => setShow(false);

  return <DrawerContext.Provider value={{ show, close, open }}>{children}</DrawerContext.Provider>;
};

const MAP_DRAWER_POSITION = {
  left: { style: "top-0 left-0 w-auto min-w-[30%] h-full", initial: { x: "-100%" } },
  right: { style: "top-0 right-0 w-auto min-w-[30%] h-full", initial: { x: "100%" } },
  top: { style: "top-0 left-0 w-full h-auto max-h-screen", initial: { y: "-100%" } },
  bottom: { style: "bottom-0 left-0 w-full h-auto max-h-screen", initial: { y: "100%" } },
};

const MAP_DRAWER_FIXED = {
  left: { style: "w-auto h-full", initial: { w: "auto" } },
};

type Position = keyof typeof MAP_DRAWER_POSITION;

export type Props = {
  show: boolean;
  close: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  position?: Position;
  transition?: Transition;
  className?: string;
  overlayClassName?: string;
  onAnimationComplete?: () => void;
  children: React.ReactNode;
} & FloatingProps;

type FloatingProps = { isFloating: true; width?: never } | { isFloating: false; width?: number };

const Drawer = ({
  className,
  children,
  show,
  close,
  closeOnOverlayClick = false,
  closeOnEscape = false,
  position = "left",
  overlayClassName,
  isFloating,
  transition = { duration: 0.2, ease: "linear" },
  width,
  onAnimationComplete,
}: Props) => {
  const containerInitial = isFloating ? "none" : "block";
  const drawerAnimate = isFloating ? { x: 0, y: 0 } : { width };

  const draweInitial = isFloating
    ? MAP_DRAWER_POSITION[position].initial
    : MAP_DRAWER_FIXED["left"].initial;

  const drawerStyle = isFloating
    ? MAP_DRAWER_POSITION[position].style
    : MAP_DRAWER_FIXED["left"].style;

  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (closeOnEscape && event.code === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyEvent);
    return () => window.removeEventListener("keydown", handleKeyEvent);
  }, [closeOnEscape, close]);

  return (
    <motion.div
      initial={{ display: containerInitial }}
      animate={{ display: show ? "block" : containerInitial }}
      className={cn(
        "relative",
        isFloating && "w-full h-full fixed top-0 z-10 bg-black/50",
        overlayClassName
      )}
      {...(closeOnOverlayClick && { onClick: close })}
    >
      <motion.div
        initial={draweInitial}
        animate={show ? drawerAnimate : draweInitial}
        transition={transition}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          `bg-background border border-muted p-4 z-10 overflow-y-scroll`,
          isFloating && "absolute",
          drawerStyle,
          className
        )}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Drawer;
