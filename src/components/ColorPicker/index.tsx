import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { ColorPicker as RColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { CiPickerHalf } from "react-icons/ci";
import { PiSealWarningBold } from "react-icons/pi";

import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: string;
  children?: React.ReactNode;
  showColor?: boolean;
  error?: FieldError;
  className?: string;
  triggerClassName?: string;
} & Partial<React.ComponentProps<typeof RColorPicker>>;

const ColorPicker = <T extends FieldValues>({
  name,
  control,
  label = "Pick a color",
  defaultValue,
  children,
  error,
  showColor,
  className,
  triggerClassName,
  ...rest
}: Props<T>) => {
  const [color, setColor] = useColor(defaultValue ?? "");

  return (
    <Popover>
      <PopoverButton>
        {children ?? (
          <div
            className={cn(
              "flex gap-1 p-2 items-center rounded-md text-sm text-muted-foreground",
              triggerClassName,
            )}
          >
            <CiPickerHalf /> {label}{" "}
            {showColor && (
              <div
                className="rounded-full size-3 ml-1"
                style={{ backgroundColor: color.hex }}
              />
            )}
            {error && <PiSealWarningBold className="ml-1 text-destructive" />}
          </div>
        )}
      </PopoverButton>
      <PopoverPanel
        transition
        className={cn(
          "absolute rounded-xl bg-background p-2 text-sm/6 transition duration-200 ease-in-out data-closed:-translate-y-1 data-closed:opacity-0",
          className,
        )}
        style={{ backgroundColor: color.hex }}
      >
        <Controller
          name={name!}
          control={control}
          render={({ field }) => (
            <RColorPicker
              color={color}
              onChange={(newColor) => {
                setColor(newColor);
                field.onChange(newColor.hex);
              }}
              {...rest}
            />
          )}
        />
      </PopoverPanel>
    </Popover>
  );
};

export default ColorPicker;
