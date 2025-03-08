import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

type Props = { id: string; children: React.ReactNode; className?: string };

const Sortable = ({ id, children, className }: Props) => {
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
    >
      <div id={id}>{children}</div>
    </div>
  );
};

export default React.memo(Sortable);
