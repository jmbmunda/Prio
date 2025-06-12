import React from "react";
import { Menu, Item, Separator, ItemParams } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  id: string;
  onEditClick?: (item: ItemParams) => void;
  onDeleteClick?: (item: ItemParams) => void;
};

const ColumnMenu = ({ id, onEditClick, onDeleteClick }: Props) => {
  return (
    <Menu id={id} animation="scale">
      <Item disabled>
        <span className="text-muted-foreground foreground text-sm font-medium">Column options</span>
      </Item>
      <Separator />
      <Item onClick={onEditClick}>
        <MdOutlineEdit className="mr-2" /> Edit column
      </Item>
      <Item onClick={onDeleteClick}>
        <AiOutlineDelete className="mr-2" /> Delete column
      </Item>
    </Menu>
  );
};

export default ColumnMenu;
