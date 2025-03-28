"use client";
import Link from "next/link";
import React from "react";
import { useDrawer } from "../Drawer";
import { IoFileTrayFullOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
const Drawer = dynamic(() => import("../Drawer"), { ssr: false });

const Navbar = () => {
  const { show, close } = useDrawer();

  return (
    <Drawer show={show} close={close} closeOnEscape closeOnOverlayClick>
      <ul className="space-y-4 flex flex-col">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li
            key={idx}
            className="p-4 flex items-center gap-2 hover:bg-primary hover:text-primary-foreground"
            onClick={() => close()}
          >
            <IoFileTrayFullOutline />
            <Link href="/">Item # {idx}</Link>
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default Navbar;
