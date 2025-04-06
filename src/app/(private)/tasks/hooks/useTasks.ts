import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { ColumnType, Task } from "../utils/types";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const useTasks = (initialData: ColumnType[]) => {
  const [columns, setColumns] = useState<ColumnType[]>(initialData);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (e: DragStartEvent) => {
    const selectedTask = columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === e.active.id);
    if (!selectedTask) return;
    setActiveTask(selectedTask);
  };

  const findColumn = (itemId: string | null): ColumnType | null => {
    if (!itemId) return null;
    return (
      columns.find((column) => column.id === itemId) ??
      columns.find((column) => column.tasks.some((task) => task.id === itemId)) ??
      null
    );
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    const activeItem = activeColumn.tasks.find((task) => task.id === activeId);
    if (!activeItem) return;

    setTimeout(() => {
      setColumns((prevColumns) => {
        const newColumns = prevColumns.map((column) => {
          if (column.id === activeColumn.id) {
            return { ...column, tasks: column.tasks.filter((task) => task.id !== activeId) };
          } else if (column.id === overColumn.id) {
            const overIndex = overColumn.tasks.findIndex((task) => task.id === overId);
            const insertIndex = overIndex >= 0 ? overIndex : overColumn.tasks.length;
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, insertIndex),
                activeItem,
                ...column.tasks.slice(insertIndex),
              ],
            };
          }
          return column;
        });
        return newColumns;
      });
    }, 0);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null;
    }
    const activeIndex = activeColumn.tasks.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.tasks.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === activeColumn.id
            ? { ...column, tasks: arrayMove(activeColumn.tasks, activeIndex, overIndex) }
            : column
        )
      );
    }
  };

  return { columns, sensors, activeTask, handleDragEnd, handleDragOver, handleDragStart };
};

export default useTasks;
