"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";

import { getTasks } from "@/actions/tasks";
import useTask from "@/app/(private)/tasks/hooks/useTask";
import { useTheme } from "@/context/theme";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { TaskWithAll } from "@/lib/types";

import Searchbar from "../Searchbar";
import { Switch } from "../ui/switch";

export const HEADER_HEIGHT = "4rem";

const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<TaskWithAll[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearch = useDebounce(searchValue, 500);
  const { onTaskClick } = useTask();

  useEffect(() => {
    (async () => {
      try {
        if (debounceSearch.trim()) {
          setIsLoading(true);
          const data = await getTasks({ q: debounceSearch });
          if (data?.length) {
            setSuggestions(data);
          }
          setIsLoading(false);
        }
      } catch {
        setIsLoading(false);
      }
    })();
  }, [debounceSearch]);

  const onSelectSuggestion = (item: TaskWithAll) => {
    onTaskClick(item.id);
    setSearchValue("");
  };

  return (
    <nav className="bg-background" style={{ height: HEADER_HEIGHT }}>
      <div className="container flex gap-4 justify-between items-center h-full">
        <div>
          <p className="font-bold text-xl capitalize">{pathname.split("/").pop()}</p>
        </div>

        {/* SEARCH */}
        <Searchbar
          value={searchValue}
          onChange={setSearchValue}
          suggestions={suggestions}
          onClearSuggestions={() => setSuggestions([])}
          onSelectSuggestion={onSelectSuggestion}
          placeholder="Enter task name or ID"
          onClear={() => setSearchValue("")}
          isLoading={isLoading}
        />

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
