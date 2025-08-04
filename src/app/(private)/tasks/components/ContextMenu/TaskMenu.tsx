import React from "react";
import { Menu, Item, Separator, ItemParams, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
  FcSynchronize,
  FcEmptyTrash,
  FcFlashOn,
} from "react-icons/fc";
import { IoCopyOutline } from "react-icons/io5";

import { ColumnType } from "../../utils/types";

type Props = {
  id: string;
  statuses: ColumnType[];
  onEditClick?: (item: ItemParams) => void;
  onCopyIdClick?: (item: ItemParams) => void;
  onCopyUrlClick?: (item: ItemParams) => void;
  onStatusClick?: (item: ItemParams) => void;
  onPriorityClick?: (item: ItemParams) => void;
  onDeleteClick?: (item: ItemParams) => void;
};

const priorities = [
  { name: "HIGH", Icon: FcHighPriority },
  { name: "MEDIUM", Icon: FcMediumPriority },
  { name: "LOW", Icon: FcLowPriority },
];

const TaskMenu = ({
  id,
  statuses,
  onCopyIdClick,
  onCopyUrlClick,
  onStatusClick,
  onPriorityClick,
  onDeleteClick,
}: Props) => {
  return (
    <Menu id={id} animation="scale">
      <Item disabled>
        <span className="text-muted-foreground foreground text-sm font-medium">Task options</span>
      </Item>
      <Separator />
      <Item onClick={onCopyIdClick}>
        <IoCopyOutline className="mr-2" /> Copy ID
      </Item>
      <Item onClick={onCopyUrlClick}>
        <IoCopyOutline className="mr-2" /> Copy URL
      </Item>
      <Submenu
        label={
          <span className="flex items-center">
            <FcSynchronize className="mr-2" /> Status
          </span>
        }
      >
        {statuses?.map(({ id, name, color }) => (
          <Item
            key={id}
            id={name}
            data={id}
            onClick={onStatusClick}
            disabled={({ props }) => props.status_id === id}
          >
            <div style={{ backgroundColor: color }} className="size-2 rounded-full mr-2" />
            <p>{name}</p>
          </Item>
        ))}
      </Submenu>

      <Submenu
        label={
          <span className="flex items-center">
            <FcFlashOn className="mr-2" /> Priority
          </span>
        }
      >
        {priorities?.map(({ name, Icon }) => (
          <Item
            key={name}
            id={name}
            data={name}
            onClick={onPriorityClick}
            disabled={({ props }) => props.priority?.toLowerCase() === name?.toLowerCase()}
          >
            <Icon className="mr-2" />
            <p className="capitalize">{name.toLowerCase()}</p>
          </Item>
        ))}
      </Submenu>
      <Item onClick={onDeleteClick}>
        <FcEmptyTrash className="mr-2" /> Delete
      </Item>
    </Menu>
  );
};

export default TaskMenu;
