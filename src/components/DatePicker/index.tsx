"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

type Props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  onChange?: (value: Date | undefined) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
};

export function DatePicker<T extends FieldValues>({
  label,
  name,
  control,
  onChange,
  placeholder = "Select Date",
  className,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col">
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
              field.onChange(date);
              onChange?.(date);
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-destructive text-xs mt-1">{error.message}</p>}
    </div>
  );
}
