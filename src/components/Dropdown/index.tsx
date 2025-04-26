import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { BiChevronDown, BiCheck } from "react-icons/bi";

import clsx from "clsx";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

type Props = {
  name?: string;
  options: Option[];
  defaultValue?: Option | null;
  onChange?: (option: Option) => void;
  placeholder?: string;
  onClose?: () => void;
  className?: string;
};

export default function Dropdown({
  name,
  options,
  defaultValue = null,
  onChange,
  placeholder = "Select an option",
  onClose,
  className,
}: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option | null>(defaultValue);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (item: Option | null) => {
    if (!item) return;
    if (onChange) onChange(item);
    setSelected(item);
  };

  const handleClose = () => {
    if (onClose) onClose();
    setQuery("");
  };

  return (
    <Combobox value={selected} onChange={handleChange} onClose={handleClose}>
      <div className={cn("relative", className)}>
        <ComboboxInput
          className={clsx(
            "block w-full rounded-lg border-none bg-foreground/5 py-1.5 pr-8 pl-3 text-sm/6 ",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-foreground/25"
          )}
          displayValue={(item: Props["options"][number]) => item?.label}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <BiChevronDown className="size-4 fill-foreground/60 group-data-[hover]:fill-foreground" />
        </ComboboxButton>
      </div>

      {selected && name && <input type="hidden" name={name} value={selected.value} />}

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-xl border border-border/5 bg-background p-1 [--anchor-gap:var(--spacing-1)] empty:invisible z-30",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredOptions.map((option, idx) => (
          <ComboboxOption
            key={`${option.label}-${idx}`}
            value={option}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-background/10"
          >
            <BiCheck className="invisible size-4 fill-foreground group-data-[selected]:visible" />
            <div className="text-sm/6 text-foreground">{option.label}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
