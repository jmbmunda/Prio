import { MenuItemProps } from "@headlessui/react";
import { Control, FieldValues, Path } from "react-hook-form";
import { IconType } from "react-icons/lib";

export type Item = {
  id: string;
  label: string;
  value: string;
  icon?: IconType;
  color?: string | null;
  onClick?: (value: string) => void;
  className?: string;
} & MenuItemProps;

export type Props<T extends Item> = {
  name: Path<FieldValues>;
  control: Control<FieldValues>;
  icon?: IconType;
  items: T[];
  onChange?: (item: T) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & LabelProps;

type LabelProps =
  | {
      placeholder?: string;
      className?: string;
      children?: never;
    }
  | {
      placeholder?: never;
      className?: never;
      children: React.ReactNode;
    };
