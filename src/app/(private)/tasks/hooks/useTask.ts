import { ItemParams } from "react-contexify";
import toast from "react-hot-toast";

import { deleteTask, updateTask } from "@/actions/tasks";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useDrawer } from "@/context/drawer";
import { useModal } from "@/context/modal";
import { TASK_DRAWER_ID } from "@/lib/constants";

const useTask = () => {
  const { openDrawer } = useDrawer();
  const { showModal } = useModal();

  const onTaskClick = (id: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("id", id);
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

  const onStatusClick = async ({ props: { id: task_id }, data }: ItemParams) => {
    try {
      await updateTask(task_id, { status_id: data });
      toast.success("Status changed!");
    } catch {
      toast.error("Failed");
    }
  };

  const onPriorityClick = async ({ props: { id: task_id }, data }: ItemParams) => {
    try {
      await updateTask(task_id, { priority: data });
      toast.success("Priority changed!");
    } catch {
      toast.error("Failed");
    }
  };

  const onDeleteTaskClick = async ({ props: { id } }: ItemParams) => {
    showModal({
      id: "confirmation-delete-task",
      component: ConfirmationModal,
      props: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete this task?",
        onConfirmClick: async () => await handleDelete(id),
        confirmLabel: "Delete",
        confirmBtnProps: { variant: "destructive" },
        cancelBtnProps: { variant: "default" },
      },
    });
  };

  const onCopyUrlClick = ({ props: { id } }: ItemParams) => {
    const url = `${window.location.href}?id=${id}`;
    navigator.clipboard.writeText(url);
    toast("Copied to clipboard");
  };

  const onCopyIdClick = ({ props: { id } }: ItemParams) => {
    navigator.clipboard.writeText(id);
    toast("Copied to clipboard");
  };

  return {
    onTaskClick,
    onPriorityClick,
    onDeleteTaskClick,
    onCopyUrlClick,
    onCopyIdClick,
    onStatusClick,
  };
};

export default useTask;
