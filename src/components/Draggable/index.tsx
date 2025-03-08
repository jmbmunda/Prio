import { useDraggable } from "@dnd-kit/core";
import React from "react";

type Props = {
  id: string;
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
};

const Draggable = ({ id, as: Component = "div", children, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Component key={id} ref={setNodeRef} style={style} {...listeners} {...attributes} {...props}>
      {children}
    </Component>
  );
};

export default Draggable;
