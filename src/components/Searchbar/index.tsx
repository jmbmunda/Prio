"use client";

import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiArrowBackOutline } from "react-icons/ti";

import { TaskWithAll } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props<T extends TaskWithAll> = {
  value: string;
  onChange: (value: string) => void;
  suggestions: T[];
  onClearSuggestions: () => void;
  onSelectSuggestion: (suggestion: T) => void;
  placeholder?: string;
  onClear?: () => void;
  isLoading?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

const Searchbar = <T extends TaskWithAll>({
  value,
  onChange,
  suggestions,
  onClearSuggestions,
  onSelectSuggestion,
  placeholder = "Search",
  onClear,
  isLoading = false,
  ...rest
}: Props<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
    if (input.trim() === "") {
      onClearSuggestions();
      return;
    }
  };

  const handleClear = () => {
    onClear?.();
    onClearSuggestions();
  };

  return (
    <div
      className={cn(
        "relative",
        "flex items-center gap-1 bg-muted border border-border px-2 py-1 rounded-md transition-all w-full duration-300 ease-in-ou",
        isFocused ? "w-96 border-muted-foreground" : "w-60"
      )}
    >
      <CiSearch className="text-muted-foreground" />
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="outline-none bg-muted w-full"
        {...rest}
      />
      {value && (
        <IoIosCloseCircleOutline
          className="cursor-pointer text-muted-foreground"
          onClick={handleClear}
        />
      )}

      {value && (
        <ul className="absolute top-10 left-0 right-0 bg-background text-foreground border rounded-md shadow-2xl z-10 max-h-60 overflow-auto divide-y">
          {isLoading && (
            <div className="grid place-items-center p-4">
              <CgSpinner className="animate-spin text-purple-500 size-4" />
            </div>
          )}

          {suggestions.length > 0 && !isLoading && (
            <>
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => onSelectSuggestion(item)}
                  className="flex items-center px-3 py-2 hover:bg-muted cursor-pointer group"
                >
                  <div>
                    <p>{item.title}</p>
                    <span className="text-xs text-muted-foreground">{item.id}</span>
                  </div>
                  <div className="hidden group-hover:block bg-purple-500 text-white rounded-md p-1 ml-auto">
                    <TiArrowBackOutline />
                  </div>
                </li>
              ))}
            </>
          )}

          {!suggestions.length && !isLoading && (
            <div className="grid place-items-center p-4">
              <p className="text-muted-foreground">No results found</p>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
