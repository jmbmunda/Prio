"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal";
import React from "react";
import ChecklistEditorModal from "./ChecklistEditorModal";

const AddItem = () => {
  const { showModal } = useModal();

  const handleAddClick = () => {
    showModal({ id: "add-checklist-item", title: "Add an item", component: ChecklistEditorModal });
  };

  return (
    <Button
      className="w-full bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:bg-gray-100 hover:bg-opacity-20"
      onClick={handleAddClick}
    >
      Add an item
    </Button>
  );
};

export default AddItem;
