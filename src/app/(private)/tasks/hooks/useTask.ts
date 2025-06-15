import { ItemParams } from "react-contexify";
import toast from "react-hot-toast";

import { deleteTask } from "@/actions/tasks";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useDrawer } from "@/context/drawer";
import { useModal } from "@/context/modal";
import { TASK_DRAWER_ID } from "@/lib/constants";
import { Task } from "@/lib/types";

const useTask = () => {
  const { openDrawer } = useDrawer();
  const { showModal } = useModal();

  const onTaskClick = (task: Task) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("id", task.id);
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
    openDrawer(TASK_DRAWER_ID);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTask(id);
      if (res) return toast.success("Task deleted!");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const onDeleteTaskClick = async ({ props: { id } }: ItemParams) => {
    showModal({
      id: "confirmation-delete-task",
      component: ConfirmationModal,
      props: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete this column?",
        onConfirmClick: async () => await handleDelete(id),
        confirmLabel: "Delete",
        confirmBtnProps: { variant: "destructive" },
        cancelBtnProps: { variant: "default" },
      },
    });
  };

  return {
    onTaskClick,
    onDeleteTaskClick,
  };
};

export default useTask;
