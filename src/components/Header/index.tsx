"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Switch } from "../ui/switch";
import { useTheme } from "@/context/theme";
import { BsMoonStarsFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";

export const HEADER_HEIGHT = "4rem";

const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-background" style={{ height: HEADER_HEIGHT }}>
      <div className="container flex justify-between items-center h-full">
        <div>
          <p className="font-bold text-xl capitalize">{pathname.split("/").pop()}</p>
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
