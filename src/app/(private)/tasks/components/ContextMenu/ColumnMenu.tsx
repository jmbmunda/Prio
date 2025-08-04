import React from "react";
import { Menu, Item, Separator, ItemParams } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { FcDeleteColumn, FcEditImage } from "react-icons/fc";

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
        <FcEditImage className="mr-2" /> Edit Column
      </Item>
      <Item onClick={onDeleteClick}>
        <FcDeleteColumn className="mr-2" /> Delete Column
      </Item>
    </Menu>
  );
};

export default ColumnMenu;
