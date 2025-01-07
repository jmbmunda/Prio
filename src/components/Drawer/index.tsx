"use client";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, type Transition } from "motion/react";
import { createPortal } from "react-dom";

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

type Position = keyof typeof MAP_DRAWER_POSITION;

type Props = {
  children: React.ReactNode;
  show: boolean;
  close: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  position?: Position;
  transition?: Transition;
  className?: string;
  overlayClassName?: string;
};

const Drawer = ({
  className,
  children,
  show,
  close,
  closeOnOverlayClick = false,
  closeOnEscape = false,
  position = "left",
  overlayClassName,
  transition = { duration: 0.2, ease: "linear" },
}: Props) => {
  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (closeOnEscape && event.code === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyEvent);
    return () => window.removeEventListener("keydown", handleKeyEvent);
  }, [closeOnEscape, close]);

  return createPortal(
    <motion.div
      initial={{ display: "none" }}
      animate={{ display: show ? "block" : "none" }}
      className={cn("w-full h-full fixed top-0 bg-black/50", overlayClassName)}
      {...(closeOnOverlayClick && { onClick: close })}
    >
      <motion.div
        initial={MAP_DRAWER_POSITION[position].initial}
        animate={show ? { x: 0, y: 0 } : MAP_DRAWER_POSITION[position].initial}
        transition={transition}
        onClick={(e) => e.stopPropagation()}
        className={cn(`absolute bg-white p-4 z-10 overflow-y-scroll`, MAP_DRAWER_POSITION[position].style, className)}
      >
        {close && (
          <span className="grid place-content-end">
            <IoClose size={24} className="cursor-pointer m-2" onClick={close} />
          </span>
        )}
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer must be used inside a DrawerProvider");
  return context;
};

export default Drawer;
