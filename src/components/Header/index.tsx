"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Switch } from "../ui/switch";
import { useTheme } from "@/context/theme";
import { BsMoonStarsFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";

const links = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Projects", path: "/projects" },
  { label: "Calendar", path: "/calendar" },
];

const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="shadow-md h-16 bg-background">
      <div className="container flex justify-between items-center h-full">
        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <Image src="/icon.png" alt="" width={35} height={35} objectFit="contain" />
            <h3 className="font-bold">Prio</h3>
          </div>
          <ul className="flex gap-4 items-center h-full mx-12">
            {links.map(({ label, path }) => (
              <li key={label} className={cn("nav-link", path === pathname && "active-nav-link")}>
                <Link href={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 items-center">
          <Switch id="theme-mode" checked={theme === "dark"} onCheckedChange={toggleTheme} />

          <label htmlFor="theme-mode" className="font-bold text-gray-500 flex gap-2 items-center">
            <span>
              {theme === "dark" ? (
                <BsMoonStarsFill className="animate-spinIn" />
              ) : (
                <ImSun className="animate-spinOut" />
              )}
            </span>
            {theme === "dark" ? "Night" : "Light"}
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Header;
