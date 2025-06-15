"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useController } from "react-hook-form";
import { MdCheck } from "react-icons/md";

import { cn } from "@/lib/utils";

import { Item, Props } from "./types";

export default function DropdownMenu<T extends Item>({
  name,
  control,
  placeholder = "Select an Item",
  icon: Icon,
  items,
  onChange,
  className,
  children,
  style,
}: Props<T>) {
  const { field } = useController({ name, control });

  return (
    <Menu>
      <MenuButton>
        {children ?? (
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm/6 font-semibold text-foreground border border-border focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700",
              className
            )}
            style={style}
          >
            {field?.value ?? placeholder}
            {Icon && <Icon className="size-4 fill-white/60" />}
          </div>
        )}
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="w-auto space-y-1 z-20 origin-top-right rounded-xl border border-foreground/5 bg-background shadow-lg p-1 text-sm/6 text-foreground transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        {items.map((item) => {
          const { id, label, value, icon: Icon, onClick, className, ...rest } = item;
          return (
            <MenuItem key={id} {...rest}>
              <button
                className={cn(
                  "group flex w-full justify-between items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 hover:bg-muted",
                  className
                )}
                onClick={() => {
                  onClick?.(value);
                  onChange?.(item);
                  field?.onChange(value);
                }}
              >
                <div className="flex gap-1 items-center">
                  {Icon && <Icon className="size-4 fill-white/30" />}
                  {label}
                </div>
                {field.value === value && <MdCheck className="size-4 self-center" />}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
