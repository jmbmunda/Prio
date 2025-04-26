"use client";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TiChevronRight } from "react-icons/ti";
import { motion, type Transition } from "motion/react";
import Link from "next/link";
import { HEADER_HEIGHT } from "../Header";
import Image from "next/image";
import { usePathname } from "next/navigation";
import GradientText from "../GradientText";

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

type Props = {
  show: boolean;
  close: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  position?: Position;
  transition?: Transition;
  className?: string;
  overlayClassName?: string;
  isFloating?: boolean;
  width?: number;
  hasMenu?: boolean;
  onMenuClick?: () => void;
} & FloatingProps;

type FloatingProps =
  | {
      isFloating?: false;
      items: { icon: React.ElementType; label: string; iconSize?: number; href: string }[];
      children?: React.ReactNode;
    }
  | {
      isFloating?: true;
      items?: never;
      children: React.ReactNode;
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
  isFloating = true,
  transition = { duration: 0.2, ease: "linear" },
  items,
  width,
  hasMenu = true,
  onMenuClick,
}: Props) => {
  const pathname = usePathname();
  const [showLabel, setShowLabel] = useState(show);

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
          `bg-background border-r border-muted p-4 z-10 overflow-y-scroll`,
          isFloating && "absolute",
          drawerStyle,
          className
        )}
        onAnimationComplete={() =>
          !show ? setShowLabel(false) : setTimeout(() => setShowLabel(true), 300)
        }
      >
        {hasMenu && (
          <div className="z-50 grid place-items-center mb-4" style={{ height: HEADER_HEIGHT }}>
            <div className="flex items-center gap-4">
              <Image src="/icon.png" alt="" width={30} height={30} objectFit="contain" />
              {show && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ opacity: { delay: 0.1 }, width: { delay: 0 } }}
                >
                  <GradientText
                    colors={["#107bb5", "#a855f7", "#10b570", "#e3d50b"]}
                    className="font-bold text-xl"
                  >
                    Prio
                  </GradientText>
                </motion.div>
              )}
            </div>
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-full z-10 absolute -right-5 bg-border text-purple-500 shadow-lg"
            >
              <TiChevronRight
                size={22}
                className={cn(
                  "cursor-pointer m-2 transition duration-800",
                  show && "transform rotate-180"
                )}
              />
            </button>
          </div>
        )}
        {!isFloating && items && (
          <ul className="space-y-4 flex flex-col">
            {items.map(({ label, icon: Icon, iconSize = 24, href }, idx) => (
              <Link
                href={href}
                key={idx}
                className={cn(
                  "p-4 flex cursor-pointer items-center rounded-md gap-4 hover:text-purple-500",
                  href === pathname && "bg-purple-500 text-white hover:text-white"
                )}
              >
                <Icon size={iconSize} />
                {showLabel && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {label}
                  </motion.span>
                )}
              </Link>
            ))}
          </ul>
        )}
        {children}
      </motion.div>
    </motion.div>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer must be used inside a DrawerProvider");
  return context;
};

export default Drawer;
