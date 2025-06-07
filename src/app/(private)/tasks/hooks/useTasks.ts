import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ColumnType } from "../utils/types";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Task } from "@/lib/types";
import { updateTaskPosition } from "@/actions/tasks";

const useTasks = (data: ColumnType[] = []) => {
  const [columns, setColumns] = useState<ColumnType[]>(data);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [oldColumn, setOldColumn] = useState<ColumnType | null>(null);

  useEffect(() => {
    if (data) setColumns(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor, { activationConstraint: { distance: 0.01 } }),
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

    const sourceColumn = findColumn(String(e.active.id));
    if (sourceColumn) {
      setOldColumn(sourceColumn);
    }
  };

  const findColumn = (itemId: string | null): ColumnType | null => {
    if (!itemId) return null;
    return (
      columns.find((column) => column.id === itemId) ??
      columns.find((column) => column.tasks.some((task) => task.id.toString() === itemId)) ??
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

    const activeItem = activeColumn.tasks.find((task) => task.id.toString() === activeId);
    if (!activeItem) return;

    setTimeout(() => {
      setColumns((prevColumns) => {
        const newColumns = prevColumns.map((column) => {
          if (column.id === activeColumn.id) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id.toString() !== activeId),
            };
          } else if (column.id === overColumn.id) {
            const overIndex = overColumn.tasks.findIndex((task) => task.id.toString() === overId);
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn) {
      return null;
    }

    const activeIndex = activeColumn.tasks.findIndex((i) => i.id.toString() === activeId);
    const overIndex = overColumn.tasks.findIndex((i) => i.id.toString() === overId);

    if (activeIndex !== overIndex) {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === activeColumn.id
            ? { ...column, tasks: arrayMove(activeColumn.tasks, activeIndex, overIndex) }
            : column
        )
      );
    }

    if (!activeTask) return null;
    const oldId = String(activeTask.id);
    if (!oldColumn) return null;
    const oldIndex = oldColumn.tasks.findIndex((i) => i.id.toString() === oldId);
    if (activeColumn.id === oldColumn.id && overIndex === oldIndex) return;
    try {
      await updateTaskPosition({
        taskId: activeId,
        newColumnId: overColumn.id,
        oldColumnId: oldColumn.id,
        newIndex: overIndex,
        oldIndex,
      });
    } catch {}
    setActiveTask(null);
  };

  return { columns, sensors, activeTask, handleDragEnd, handleDragOver, handleDragStart };
};

export default useTasks;
