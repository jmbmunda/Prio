import React from "react";
import DatePicker from "react-datepicker";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

import { Label } from "../ui/label";

type DatePickerTimeProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  isClearable?: boolean;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  containerClassName?: string;
};

const DatePickerTime = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select Date",
  isClearable = true,
  showTimeSelect = true,
  timeIntervals = 15,
  dateFormat = "MM/dd/yyyy h:mm aa",
  minDate,
  maxDate,
  className,
  containerClassName,
}: DatePickerTimeProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={cn("flex flex-col", containerClassName)}>
      {label && (
        <Label
          htmlFor="date"
          className="pointer-events-none text-sm/6 font-normal text-muted-foreground"
        >
          {label}
        </Label>
      )}
      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        isClearable={isClearable}
        showTimeSelect={showTimeSelect}
        timeIntervals={timeIntervals}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        onKeyDown={(e) => e.preventDefault()}
        className={cn(
          "block w-full rounded-lg border-none bg-foreground/5 py-1.5 px-3 text-sm/6 cursor-pointer",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-foreground/25",
          error && "bg-destructive/5",
          className
        )}
      />
      {error && <p className="text-destructive text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default DatePickerTime;
