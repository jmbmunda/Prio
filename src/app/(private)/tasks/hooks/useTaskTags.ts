import { assignTagToTask, getTags, unassignTagFromTask } from "@/actions/tags";
import { Tag } from "@prisma/client";
import { useOptimistic, useTransition } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

const useTaskTags = (taskId: string, tags: Tag[]) => {
  const { data: tagList } = useSWR("tags", getTags);
  const [, startTransition] = useTransition();
  const [optimisticTags, addOptimisticTags] = useOptimistic<Tag[], { type: string; data: Tag }>(
    tags,
    (state, action) => {
      switch (action.type) {
        case "add":
          return [...new Set([...state, action.data])];
        case "delete":
          return state.filter((tag) => tag.id !== action.data.id);
        default:
          return state;
      }
    }
  );

  const options =
    tagList
      ?.filter((item) => !optimisticTags?.some((tag) => tag.id === item.id))
      .map((item) => ({
        ...item,
        label: item.name,
        value: item.name,
      })) ?? [];

  const handleAssignTag = async (item: Tag) => {
    startTransition(() => {
      addOptimisticTags({ type: "add", data: item });
    });
    try {
      const res = await assignTagToTask(item.id, taskId);
      if (res.success) {
        mutate(
          ["task-details", taskId],
          (prevData) => {
            return {
              ...prevData,
              tags: [...prevData.tags, item],
            };
          },
          false
        );
      }
    } catch {
      toast.error("Failed to assign tag");
    }
  };

  const handleRemoveTag = async (item: Tag) => {
    startTransition(() => {
      addOptimisticTags({ type: "delete", data: item });
    });
    try {
      const res = await unassignTagFromTask(item.id, taskId);
      if (res.success) {
        mutate(["task-details", taskId]);
      }
    } catch {
      toast.error("Failed to remove tag");
    }
  };

  return { options, optimisticTags, handleAssignTag, handleRemoveTag };
};

export default useTaskTags;
