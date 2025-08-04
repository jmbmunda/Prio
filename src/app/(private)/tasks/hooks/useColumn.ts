import { ItemParams } from "react-contexify";
import toast from "react-hot-toast";

import { deleteStatus } from "@/actions/status";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useModal } from "@/context/modal";

import ColumnEditorModal from "../components/Columns/ColumnEditorModal";

const useColumn = () => {
  const { showModal } = useModal();

  const onAddColumnClick = () => {
    showModal({
      id: "add-column",
      component: ColumnEditorModal,
      title: "New Column",
      props: { type: "ADD" },
    });
  };

  const onEditColumnClick = ({ props: { name, id, color } }: ItemParams) => {
    showModal({
      id: "edit-column",
      component: ColumnEditorModal,
      title: "Edit Column",
      props: { id, name, color, type: "EDIT" },
    });
  };

  const onDeleteColumnClick = ({ props: { id } }: ItemParams) => {
    showModal({
      id: "confirmation-delete-column",
      component: ConfirmationModal,
      props: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete this column?",
        onConfirmClick: async () => {
          try {
            const res = await deleteStatus(id);
            if (res) toast.success("Deleted!");
          } catch {
            toast.error("Failed to delete column");
          }
        },
        confirmLabel: "Delete",
        confirmBtnProps: { variant: "destructive" },
        cancelBtnProps: { variant: "default" },
      },
    });
  };

  return {
    onAddColumnClick,
    onEditColumnClick,
    onDeleteColumnClick,
  };
};

export default useColumn;
