"use client";
import React from "react";
import { useDrawer } from "../Drawer";
import dynamic from "next/dynamic";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoTasklist, GoProjectRoadmap } from "react-icons/go";

const Drawer = dynamic(() => import("../Drawer"), { ssr: false });

const LINKS = [
  { label: "Dashboard", icon: MdOutlineSpaceDashboard, href: "/dashboard" },
  { label: "Tasks", icon: GoTasklist, href: "/tasks" },
  { label: "Projects", icon: GoProjectRoadmap, href: "/projects" },
  { label: "Calendar", icon: IoCalendarNumberOutline, href: "/calendar" },
];

const Navbar = () => {
  const { show, close, open } = useDrawer();

  const toggleDrawer = () => (show ? close() : open());

  return (
    <Drawer
      show={show}
      close={close}
      closeOnEscape
      closeOnOverlayClick
      isFloating={false}
      items={LINKS}
      width={300}
      onMenuClick={toggleDrawer}
    />
  );
};

export default Navbar;
