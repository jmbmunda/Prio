"use client";

import { Input } from "@headlessui/react";
import dayjs from "dayjs";
import * as React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  onChange?: (value: Date | undefined) => void;
  onBlur?: () => void;
  placeholder?: string;
  withTime?: boolean;
  className?: string;
};

export function DatePicker<T extends FieldValues>({
  label,
  name,
  control,
  onChange,
  placeholder = "Select Date",
  withTime,
  className,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState("00:00:00");

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const getCombinedDateTime = (date: Date, timeStr: string): Date => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    return combined;
  };

  const handleChange = (newDate?: Date, newTime?: string) => {
    if (!newDate) {
      field.onChange(undefined);
      onChange?.(undefined);
      return;
    }

    const finalTime = newTime ?? time;
    const combinedDateTime = getCombinedDateTime(newDate, finalTime);
    setDate(newDate);
    setTime(finalTime);
    field?.onChange(combinedDateTime);
    onChange?.(combinedDateTime);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <div className="flex flex-col flex-1">
          {label && (
            <Label
              htmlFor="date"
              className="pointer-events-none text-sm/6 font-normal text-muted-foreground"
            >
              {label}
            </Label>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className={cn(
                  "w-48 justify-between bg-foreground/5 hover:bg-foreground/10 font-normal",
                  className
                )}
              >
                {date ? dayjs(date).format("MMM DD, YYYY") : placeholder}
                <FaCalendarAlt className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  handleChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        {withTime && (
          <div className="flex flex-col flex-1">
            <Label
              htmlFor="date"
              className="pointer-events-none text-sm/6 font-normal text-muted-foreground"
            >
              Time
            </Label>
            <Input
              type="time"
              id="time-picker"
              step="1"
              onChange={(e) => {
                const timeValue = e.target.value;
                handleChange(date, timeValue);
              }}
              defaultValue="00:00:00"
              disabled={!date}
              className={cn(
                "block w-full rounded-lg border-none bg-foreground/5 py-1.5 px-3 text-sm/6 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-foreground/25",
                "disabled:text-muted-foreground disabled:cursor-not-allowed"
              )}
            />
          </div>
        )}
      </div>

      {error && <p className="text-destructive text-xs mt-1">{error.message}</p>}
    </div>
  );
}
