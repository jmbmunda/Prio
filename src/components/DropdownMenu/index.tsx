import { cn } from "@/lib/utils";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Item, Props } from "./types";
import { useState } from "react";

export default function DropdownMenu<T extends Item>({
  placeholder = "Select an Item",
  icon: Icon,
  items,
  onChange,
  className,
  children,
  style,
}: Props<T>) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
            {selectedValue ?? placeholder}
            {Icon && <Icon className="size-4 fill-white/60" />}
          </div>
        )}
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom start"
        className="w-auto z-20 origin-top-right rounded-xl border border-foreground/5 bg-background shadow-lg p-1 text-sm/6 text-foreground transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
      >
        {items.map((item) => {
          const { id, label, value, icon: Icon, onClick, className, ...rest } = item;
          return (
            <MenuItem key={id} {...rest}>
              <button
                className={cn(
                  "group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 hover:bg-muted",
                  className
                )}
                onClick={() => {
                  onClick?.(value);
                  onChange?.(item);
                  setSelectedValue(value);
                }}
              >
                {Icon && <Icon className="size-4 fill-white/30" />}
                {label}
                <kbd className="ml-auto hidden text-xs text-foreground/50 group-data-focus:inline">
                  ⌘E
                </kbd>
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
