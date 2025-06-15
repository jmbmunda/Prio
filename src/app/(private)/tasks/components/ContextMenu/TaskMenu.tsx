import React from "react";
import { Menu, Item, Separator, ItemParams } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { FcSynchronize, FcEmptyTrash } from "react-icons/fc";

type Props = {
  id: string;
  onEditClick?: (item: ItemParams) => void;
  onDeleteClick?: (item: ItemParams) => void;
};

const TaskMenu = ({ id, onEditClick, onDeleteClick }: Props) => {
  return (
    <Menu id={id} animation="scale">
      <Item disabled>
        <span className="text-muted-foreground foreground text-sm font-medium">Task options</span>
      </Item>
      <Separator />
      <Item onClick={onEditClick}>
        <FcSynchronize className="mr-2" /> Change Status
      </Item>
      <Item onClick={onDeleteClick}>
        <FcEmptyTrash className="mr-2" /> Delete
      </Item>
    </Menu>
  );
};

export default TaskMenu;
