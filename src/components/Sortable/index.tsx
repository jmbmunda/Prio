import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

import { cn } from "@/lib/utils";

type Props = { id: string; children: React.ReactNode; onClick: () => void; className?: string };

const Sortable = ({ id, children, onClick, className }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging, transition } = useSortable({
    id: id,
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn(className, "will-change-transform")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default React.memo(Sortable);
