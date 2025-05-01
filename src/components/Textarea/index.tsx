import React from "react";
import { Textarea as HTextarea, TextareaProps } from "@headlessui/react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  className?: string;
} & TextareaProps;

const TextArea = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm/6 text-muted-foreground">
          {label}
        </label>
      )}
      <HTextarea
        {...rest}
        className={cn(
          "block w-full min-h-28 rounded-lg border-none bg-foreground/5 py-1.5 px-3 text-sm/6 ",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-foreground/25",
          error && "bg-destructive/5",
          className
        )}
        {...field}
      />
      {error && <p className="text-destructive text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default TextArea;
