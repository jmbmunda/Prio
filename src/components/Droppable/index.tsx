import { useDroppable } from "@dnd-kit/core";
import React from "react";

type Props = {
  id: string;
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
};

const Droppable = ({ id, as: Component = "div", children, className, ...props }: Props) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Component ref={setNodeRef} className={className} {...props}>
      {children}
    </Component>
  );
};

export default Droppable;
