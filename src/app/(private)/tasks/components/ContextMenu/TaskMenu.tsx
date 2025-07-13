import React from "react";
import { Menu, Item, Separator, ItemParams, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
  FcSynchronize,
  FcEmptyTrash,
  FcCheckmark,
  FcFlashOn,
} from "react-icons/fc";

type Props = {
  id: string;
  onEditClick?: (item: ItemParams) => void;
  onPriorityClick?: (item: ItemParams) => void;
  onDeleteClick?: (item: ItemParams) => void;
};

const priorities = [
  { name: "High", Icon: FcHighPriority },
  { name: "Medium", Icon: FcMediumPriority },
  { name: "Low", Icon: FcLowPriority },
];

const TaskMenu = ({ id, onEditClick, onPriorityClick, onDeleteClick }: Props) => {
  return (
    <Menu id={id} animation="scale">
      <Item disabled>
        <span className="text-muted-foreground foreground text-sm font-medium">Task options</span>
      </Item>
      <Separator />
      <Item onClick={onEditClick}>
        <FcSynchronize className="mr-2" /> Change Status
      </Item>
      <Item onClick={onEditClick}>
        <FcSynchronize className="mr-2" /> Change Priority
      </Item>
      <Submenu
        label={
          <span className="flex items-center">
            <FcFlashOn className="mr-2" /> Priority
          </span>
        }
      >
        {priorities?.map(({ name, Icon }) => (
          <Item key={name} onClick={onPriorityClick}>
            <Icon className="mr-2" />
            {name}
            <FcCheckmark className="ml-auto" />
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
