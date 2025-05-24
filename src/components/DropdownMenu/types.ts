import { MenuItemProps } from "@headlessui/react";
import { IconType } from "react-icons/lib";

export type Item = {
  id: string;
  label: string;
  value: string;
  icon?: IconType;
  onClick?: (value: string) => void;
  className?: string;
} & MenuItemProps;

export type Props<T extends Item> = {
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
